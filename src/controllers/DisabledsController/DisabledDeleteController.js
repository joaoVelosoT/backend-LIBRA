const DisabledDeleteService = require("../../services/DisabledServices/DisabledDeleteService");

const DisabledDeleteController = async (req, res) => {
  try {
    const disabled = await DisabledDeleteService(req.params.id);
    if (!disabled.success) {
      return res.status(disabled.code).json(disabled);
    }

    return res.status(disabled.code).json({
      code: disabled.code,
      data: disabled.disabled,
      message: disabled.message,
      success: disabled.success,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      error: {
        details: [
          {
            controller: "DisabledDeleteController",
            message: "Erro interno",
          },
        ],
      },
      message: "Erro no DisabledDeleteController",
      success: false,
    });
  }
};

module.exports = DisabledDeleteController;
