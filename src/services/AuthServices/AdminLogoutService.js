// services/AuthServices/AdminLogoutService.js
const Admin = require("../../models/Admin");

const AdminLogoutService = async (adminId) => {
  try {
    // Busca o admin no banco de dados
    const admin = await Admin.findOne({ where: { id: adminId } });

    if (admin) {
      // Remove o token válido
      await admin.update({ validToken: null });
    }

    return {
      code: 200,
      message: "Logout realizado com sucesso",
      success: true,
    };
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

module.exports = AdminLogoutService;