const NotificationDeleteService = require("../../services/NotificationServices/NotificationDeleteService");

const NotificationDeleteController = async (req, res) => {
  try {
    const result = await NotificationDeleteService(req.params.id);
    if (!result.success) {
      return res.status(result.code).json(result);
    }

    return res.status(result.code).json({
      code: result.code,
      data: result.data,
      message: result.message,
      success: result.success,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      error: {
        details: [
          {
            controller: "NotificationDeleteController",
            message: "Erro interno",
          },
        ],
      },
      message: "Erro no NotificationDeleteController",
      success: false,
    });
  }
};

module.exports = NotificationDeleteController;