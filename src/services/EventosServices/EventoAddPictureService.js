const Admin = require("../../models/Admin");
const AdminFoto = require("../../models/adminFoto");
const Arquivos = require("../../models/Arquivos");
const sequelize = require("../../database/config");
const uploadCreateService = require("../uploadServices/uploadCreateService");
const uploadDeleteService = require("../uploadServices/uploadDeleteService");

const AdminAddPictureService = async (idAdmin, imagemPerfil) => {
  const transaction = await sequelize.transaction();

  try {
    // Busca o admin pelo ID
    const admin = await Admin.findByPk(idAdmin, { transaction });

    if (!admin) {
      await transaction.rollback();
      return {
        code: 404,
        error: {
          details: [
            {
              message: "Admin não encontrado.",
            },
          ],
        },
        message: "Erro ao buscar admin por ID",
        success: false,
      };
    }

    // Se o admin já tiver uma foto, deleta a antiga
    if (admin.id_AdminFoto) {
      const adminFoto = await AdminFoto.findByPk(admin.id_AdminFoto, { transaction });

      if (adminFoto) {
        const arquivo = await Arquivos.findByPk(adminFoto.id_link, { transaction });

        if (arquivo) {
          // Deleta o arquivo do Google Cloud Storage
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
              message: "Erro ao deletar a foto antiga",
              success: false,
            };
          }

          // Deleta o registro do arquivo no banco de dados
          await arquivo.destroy({ transaction });
        }

        // Deleta o registro da foto do admin
        await adminFoto.destroy({ transaction });
      }

      // Define o campo id_AdminFoto como NULL no admin
      admin.id_AdminFoto = null;
      await admin.save({ transaction });
    }

    // Faz o upload da nova foto
    const { originalname, buffer, mimetype } = imagemPerfil;
    const nomePasta = `admins/${admin.name.replace(/\s+/g, "_")}`;

    const uploadResult = await uploadCreateService.create(
      originalname,
      buffer,
      mimetype,
      "foto",
      nomePasta
    );

    if (!uploadResult.success) {
      await transaction.rollback();
      return uploadResult; // Retorna o erro do upload
    }

    // Cria o registro da nova foto
    const novaAdminFoto = await AdminFoto.create(
      {
        id_link: uploadResult.arquivoId,
      },
      { transaction }
    );

    // Atualiza o admin com o ID da nova foto
    admin.id_AdminFoto = novaAdminFoto.id;
    await admin.save({ transaction });

    // Confirma a transação
    await transaction.commit();

    return {
      code: 200,
      message: "Foto de perfil atualizada com sucesso!",
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
      message: "Erro ao atualizar a foto de perfil",
      success: false,
    };
  }
};

module.exports = AdminAddPictureService;