const AdminGetByIdService = require("../../services/AdminServices/AdminGetByIdService");

const AdminGetByIdController = async (req, res) => {
  try {
    const admin = await AdminGetByIdService(req.params.id);
    if (!admin.success) {
      return res.status(admin.code).json(admin);
    }

    return res.status(200).json({
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
            controller: "AdminGetByIdController",
            message: "Erro interno",
          },
        ],
      },
      message: "Erro no AdminGetByIdController",
      success: false,
    });
  }
};

module.exports = AdminGetByIdController;