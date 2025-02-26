const Notification = require("../../models/Notification");

const NotificationCreateService = async (data) => {
  try {

    const newNotification = await Notification.create(data);

    return {
      code: 201,
      data: newNotification,
      message: "Notificação criada com sucesso",
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      code: 500,
      error: {
        details: [
          {
            service: "NotificationCreateService",
            message: "Erro interno ao criar notificação",
          },
        ],
      },
      message: "Erro ao criar notificação",
      success: false,
    };
  }
};

module.exports = NotificationCreateService;