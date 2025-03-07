const Notification = require("../../models/Notification");

const NotificationDeleteService = async (id) => {
  try {
    console.log("ID recebido no serviço:", id, "Tipo:", typeof id);

    // Verifica se o ID é um número válido
    if (!id || isNaN(Number(id))) {
      return {
        code: 400,
        error: {
          details: [
            {
              field: "id",
              message: "O id enviado não é um número válido",
            },
          ],
        },
        message: "Erro ao validar id",
        success: false,
      };
    }

    const notification = await Notification.findByPk(Number(id)); // Converte o ID para número
    console.log("Notificação encontrada:", notification);

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
    console.log("Notificação deletada com sucesso");

    return {
      code: 200,
      data: notification,
      message: "Notificação deletada com sucesso",
      success: true,
    };
  } catch (error) {
    console.error("Erro no NotificationDeleteService:", error);
    return {
      code: 500,
      error: {
        details: [
          {
            service: "NotificationDeleteService",
            message: "Erro interno ao deletar notificação",
          },
        ],
      },
      message: "Erro ao deletar notificação",
      success: false,
    };
  }
};

module.exports = NotificationDeleteService;