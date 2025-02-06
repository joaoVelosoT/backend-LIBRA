const DisabledGetAllService = require("../../services/DisabledServices/DisabledGetAllService");

const DisabledGetAllController = async (req, res) => {
  try {
    const response = await DisabledGetAllService();
    return res.status(response.code).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      error: {
        details: [
          {
            controller: "DisabledGetAllController",
            message: "Erro interno",
          },
        ],
      },
      message: "Erro no DisabledGetAllController",
      success: false,
    });
  }
};

module.exports = DisabledGetAllController;