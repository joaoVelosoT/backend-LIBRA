const AdminUpdateService = require("../../services/AdminServices/AdminUpdateService");

const AdminUpdateController = async (req, res) => {
  try {
    const dataUpdate = {
      idAdmin: req.params.id,
      dataUpdate: req.dataUpdate,
    };

    const admin = await AdminUpdateService(dataUpdate);
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
            controller: "AdminUpdateController",
            message: "Erro interno",
          },
        ],
      },
      message: "Erro no AdminUpdateController",
      success: false,
    });
  }
};

module.exports = AdminUpdateController;