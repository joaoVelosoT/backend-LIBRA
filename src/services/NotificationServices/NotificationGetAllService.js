const Notification = require("../../models/Notification");

const NotificationGetAllService = async () => {
  try {
    const notifications = await Notification.findAll();

    if (notifications.length === 0) {
      return {
        code: 404,
        data: notifications,
        message: "Nenhuma notificação encontrada",
        success: true,
      };
    }

    return {
      code: 200,
      data: notifications,
      message: "Notificações listadas com sucesso",
      success: true,
    };
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

module.exports = NotificationGetAllService;