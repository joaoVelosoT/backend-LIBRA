const NotificationRequestedBook = require("../../models/NotificationRequestedBook");

const NotificationRequestedBookGetAllService = async () => {
  try {
    const notificationRequestedBook = await NotificationRequestedBook.findAll();

    if (notificationRequestedBook.length === 0) {
      return {
        code: 404,
        data: notificationRequestedBook,
        message: "Nenhuma notificação encontrada",
        success: true,
      };
    }

    return {
      code: 200,
      data: notificationRequestedBook,
      message: "Notificações de Livros listadas com sucesso",
      success: true,
    };
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

module.exports = NotificationRequestedBookGetAllService;