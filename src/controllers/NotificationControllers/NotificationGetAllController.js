const NotificationGetAllService = require("../../services/NotificationServices/NotificationGetAllService");

const NotificationGetAllController = async (req, res) => {
  try {
    const response = await NotificationGetAllService();
    return res.status(response.code).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      error: {
        details: [
          {
            controller: "NotificationGetAllController",
            message: "Erro interno",
          },
        ],
      },
      message: "Erro no NotificationGetAllController",
      success: false,
    });
  }
};

module.exports = NotificationGetAllController;