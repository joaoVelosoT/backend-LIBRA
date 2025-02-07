const DisabledCreateService = require("../../services/DisabledServices/DisabledCreateService");

const DisabledCreateController = async (req, res) => {
  try {
    const result = await DisabledCreateService(req.disabledData);
    return res.status(result.code).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      error: {
        details: [
          {
            controller: "DisabledCreateController",
            message: "Erro interno",
          },
        ],
      },
      message: "Erro no DisabledCreateController",
      success: false,
    });
  }
};

module.exports = DisabledCreateController;