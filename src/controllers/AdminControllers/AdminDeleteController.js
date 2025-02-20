const AdminDeleteService = require("../../services/AdminServices/AdminDeleteService");

const AdminDeleteController = async (req, res, next) => {
  try {
    const admin = await AdminDeleteService(req.params.id);
    if (!admin.success) {
      return res.status(admin.code).json(admin);
    }

    return res.status(admin.code).json({
      code: admin.code,
      data: admin.admin,
      message: admin.message,
      success: admin.success,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      error: {
        details: [
          {
            controller: "AdminDeleteController",
            message: "Erro interno",
          },
        ],
      },
      message: "Erro no AdminDeleteController",
      success: false,
    });
  }
};

module.exports = AdminDeleteController;