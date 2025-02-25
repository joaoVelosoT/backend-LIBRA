const NotificationCreateService = require("../../services/NotificationServices/NotificationCreateService");

const NotificationCreateController = async (req, res) => {
  try {
    const result = await NotificationCreateService(req.notificationData);
    return res.status(result.code).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      error: {
        details: [
          {
            controller: "NotificationCreateController",
            message: "Erro interno",
          },
        ],
      },
      message: "Erro no NotificationCreateController",
      success: false,
    });
  }
};

module.exports = NotificationCreateController;