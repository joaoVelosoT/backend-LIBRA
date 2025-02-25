const Notification = require("../../models/Notification");

const NotificationDeleteService = async (id) => {
  try {
    const notification = await Notification.findByPk(id);

    if (!notification) {
      return {
        code: 404,
        error: {
          details: [
            {
              message: "Notificação não encontrada",
            },
          ],
        },
        message: "Erro ao buscar notificação por ID",
        success: false,
      };
    }

    await notification.destroy();

    return {
      code: 200,
      data: notification,
      message: "Notificação deletada com sucesso",
      success: true,
    };
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

module.exports = NotificationDeleteService;