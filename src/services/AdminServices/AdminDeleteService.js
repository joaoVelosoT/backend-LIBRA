const Admin = require("../../models/Admin");
const AdminFoto = require("../../models/AdminFoto");
const Arquivos = require("../../models/Arquivos");
const sequelize = require("../../database/config");
const uploadDeleteService = require("../uploadServices/uploadDeleteService");

const AdminDeleteService = async (idAdmin) => {
  const transaction = await sequelize.transaction();

  try {
    // Validar se o admin existe
    const admin = await Admin.findByPk(idAdmin, { transaction });

    if (!admin) {
      await transaction.rollback();
      return {
        code: 404,
        error: {
          details: [
            {
              message: "Admin não encontrado",
            },
          ],
        },
        message: "Erro ao buscar admin por id",
        success: false,
      };
    }

    // Verificar se o admin tem uma foto associada
    if (admin.id_AdminFoto) {
      const adminFoto = await AdminFoto.findByPk(admin.id_AdminFoto, { transaction });

      if (adminFoto) {
        // Buscar o arquivo associado à foto
        const arquivo = await Arquivos.findByPk(adminFoto.id_link, { transaction });

        if (arquivo) {
          // Deletar o arquivo do Google Cloud Storage usando o uploadDeleteService
          const deleteResult = await uploadDeleteService.delete(arquivo.id);

          if (!deleteResult.success) {
            await transaction.rollback();
            return {
              code: deleteResult.code,
              error: {
                details: [
                  {
                    message: deleteResult.message,
                  },
                ],
              },
              message: "Erro ao deletar arquivo do cloud",
              success: false,
            };
          }

          // Deletar o arquivo do banco de dados
          await arquivo.destroy({ transaction });
        }

        // Deletar a foto do admin
        await adminFoto.destroy({ transaction });
      }
    }

    // Deletar o admin
    await admin.destroy({ transaction });

    // Confirmar a transação
    await transaction.commit();

    return {
      code: 200,
      admin,
      message: "Admin e foto associada deletados com sucesso",
      success: true,
    };
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    return {
      code: 500,
      error: {
        details: [
          {
            message: error.message,
          },
        ],
      },
      message: "Erro ao deletar admin",
      success: false,
    };
  }
};

module.exports = AdminDeleteService;