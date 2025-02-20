const Admin = require("../../models/Admin");

const AdminGetByIdService = async (idAdmin) => {
  try {

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
        message: "Erro ao buscar admin por ID",
        success: false,
      };
    }

    return {
      code: 200,
      admin,
      message: "Admin encontrado com sucesso",
      success: true,
    };
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

module.exports = AdminGetByIdService;