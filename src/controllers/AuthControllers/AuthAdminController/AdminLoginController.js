// controllers/AuthControllers/AdminLoginController.js
const AdminLoginService = require("../../../services/AuthServices/AdminLoginService");
const AdminLoginController = async (req, res) => {
  try {
    const admin = await AdminLoginService(req.dataLogin);
    if (!admin.success) {
      return res.status(admin.code).json(admin);
    }

    return res.status(admin.code).json({
      code: admin.code,
      data: admin.data,
      message: admin.message,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      error: {
        details: [
          {
            controller: "AdminLoginController",
            message: "Erro interno",
          },
        ],
      },
      message: "Erro no AdminLoginController",
      success: false,
    });
  }
};

module.exports = AdminLoginController;