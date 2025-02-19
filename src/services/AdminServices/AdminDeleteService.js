const Admin = require("../../models/Admin");

const AdminDeleteService = async (idAdmin) => {
  try {
    // Validar se o admin existe
    const admin = await Admin.findByPk(idAdmin);
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
        message: "Erro ao buscar admin por id",
        success: false,
      };
    }

    // Deletando o admin
    await admin.destroy();

    return {
      code: 200,
      admin,
      message: "Admin deletado com sucesso",
      success: true,
    };
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

module.exports = AdminDeleteService;