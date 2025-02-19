const AdminGetAllService = require("../../services/AdminServices/AdminGetAllService");

const AdminGetAllController = async (req, res) => {
  try {
    const admins = await AdminGetAllService(req.query);
    if (!admins.success) {
      return res.status(admins.code).json(admins);
    }

    return res.status(200).json({
      code: admins.code,
      data: admins.admins,
      message: admins.message,
      success: admins.success,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      error: {
        details: [
          {
            controller: "AdminGetAllController",
            message: "Erro interno",
          },
        ],
      },
      message: "Erro no AdminGetAllController",
      success: false,
    });
  }
};

module.exports = AdminGetAllController;