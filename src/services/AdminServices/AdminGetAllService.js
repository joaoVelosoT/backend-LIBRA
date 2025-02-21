const Admin = require("../../models/Admin");

const AdminGetAllService = async (query) => {
  try {
    const admins = await Admin.findAll();

    if (admins.length === 0) {
      return {
        code: 404,
        admins,
        message: "Nenhum admin encontrado",
        success: true,
      };
    }

    return {
      code: 200,
      admins,
      message: "Todos os admins encontrados",
      success: true,
    };
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

module.exports = AdminGetAllService;