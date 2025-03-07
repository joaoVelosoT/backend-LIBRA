const NotificationRequestedBookGetAllService = require("../../services/NotificationRequestedBookServices/NotificationRequestedBookGetAllService");

const NotificationRequestedBookGetAllController = async (req, res) => {
  try {
    const response = await NotificationRequestedBookGetAllService();
    return res.status(response.code).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      error: {
        details: [
          {
            controller: "NotificationRequestedBookGetAllController",
            message: "Erro interno",
          },
        ],
      },
      message: "NotificationRequestedBookGetAllController",
      success: false,
    });
  }
};

module.exports = NotificationRequestedBookGetAllController;