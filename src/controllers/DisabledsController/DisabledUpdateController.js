const DisabledUpdateService = require("../../services/DisabledServices/DisabledUpdateService");

const DisabledUpdateController = async (req, res) => {
  try {
    const dataUpdate = {
      id: req.params.id,
      data: req.body,
    };

    const response = await DisabledUpdateService(dataUpdate);
    return res.status(response.code).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      error: {
        details: [
          {
            controller: "DisabledUpdateController",
            message: "Erro interno",
          },
        ],
      },
      message: "Erro no DisabledUpdateController",
      success: false,
    });
  }
};

module.exports = DisabledUpdateController;
