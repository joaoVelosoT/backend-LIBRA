const DisabledGetByIdService = require("../../services/DisabledServices/DisabledGetByIdService");

const DisabledGetByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await DisabledGetByIdService(id);
    return res.status(response.code).json(response);

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      error: {
        details: [
          {
            controller: "DisabledGetByIdController",
            message: "Erro interno",
          },
        ],
      },
      message: "Erro no DisabledGetByIdController",
      success: false,
    });
  }
};

module.exports = DisabledGetByIdController;