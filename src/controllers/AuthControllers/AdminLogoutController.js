// controllers/AuthControllers/AdminLogoutController.js
const AdminLogoutService = require("../../services/AuthServices/AdminLogoutService");

const AdminLogoutController = async (req, res) => {
  try {
    const adminId = req.user.id; // ID do admin obtido do token decodificado

    const result = await AdminLogoutService(adminId);

    return res.status(result.code).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      error: {
        details: [
          {
            controller: "AdminLogoutController",
            message: "Erro interno",
          },
        ],
      },
      message: "Erro no AdminLogoutController",
      success: false,
    });
  }
};

module.exports = AdminLogoutController;