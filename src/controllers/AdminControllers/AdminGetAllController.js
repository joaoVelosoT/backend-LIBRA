const AdminGetAllService = require("../../services/AdminServices/AdminGetAllService");

const AdminGetAllController = async (req, res) => {
  try {
    const admins = await AdminGetAllService.getAll();

    return res.status(admins.code).json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).json({
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