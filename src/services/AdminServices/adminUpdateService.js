const Admin = require("../../models/Admin");

const AdminUpdateService = async (dataUpdate) => {
  try {
    
    // Buscar o admin pelo ID
    const admin = await Admin.findByPk(dataUpdate.idAdmin);

    // Validar se o admin foi encontrado
    if (!admin) {
      return {
        code: 404,
        error: {
          details: [
            {
              message: "Admin não encontrado",
            },
          ],
        },
        message: "Erro ao buscar admin por ID",
        success: false,
      };
    }

    // Atualizar o email do admin
    await admin.update(dataUpdate.dataUpdate);

    return {
      code: 200,
      admin,
      message: "Admin atualizado com sucesso",
      success: true,
    };
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

module.exports = AdminUpdateService;