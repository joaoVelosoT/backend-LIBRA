const NotificationDeleteService = require("../../services/NotificationServices/NotificationDeleteService");

const NotificationDeleteController = async (req, res) => {
  try {
    const result = await NotificationDeleteService(req.params.id);
    return res.status(result.code).json(result);
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