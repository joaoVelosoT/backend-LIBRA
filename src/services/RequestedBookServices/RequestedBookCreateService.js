const RequestedBook = require("../../models/RequestedBook");
const Notification = require("../../models/Notification");
const NotificationRequestedBookCreateService = require("../NotificationRequestedBookServices/NotificationRequestedBookCreateService");
const sequelize = require("../../database/config");

const RequestedBookCreateService = async (data) => {
    const transaction = await sequelize.transaction();

    try {
        // Verificar se já existe um livro com o mesmo título
        const existingRequestedBook = await RequestedBook.findOne({
            where: { title: data.title },
            transaction,
        });

        if (existingRequestedBook) {
            await transaction.rollback();
            return {
                code: 409,
                error: {
                    details: [
                        {
                            field: "title",
                            message: "Livro com o mesmo título já cadastrado no banco de dados",
                        },
                    ],
                },
                message: "Erro ao validar RequestedBookCreate",
                success: false,
            };
        }

        // Criar o livro solicitado
        const newRequestedBook = await RequestedBook.create(data, { transaction });

        // Criar a notificação do tipo "book"
        const notificationTitle = "Solicitação de livro";
        const notificationDescription = `Título: ${data.title} Descrição: ${data.author} Gênero: ${data.gender}`;

        const newNotification = await Notification.create(
            {
                title: notificationTitle,
                description: notificationDescription,
                type: "book",
            },
            { transaction }
        );

        // Criar o registro na tabela NotificationRequestedBook
        const notificationRequestedBookResult = await NotificationRequestedBookCreateService(
            {
                idNotification: newNotification.id,
                idRequestedBook: newRequestedBook.id,
            },
            transaction // Passar a transação existente
        );

        // Se houver erro ao criar o registro em NotificationRequestedBook, desfazer a transação
        if (!notificationRequestedBookResult.success) {
            await transaction.rollback();
            return notificationRequestedBookResult;
        }

        // Confirmar a transação
        await transaction.commit();

        return {
            code: 201,
            data: newRequestedBook,
            message: "Livro solicitado, notificação e registro em NotificationRequestedBook criados com sucesso",
            success: true,
        };
    } catch (error) {
        await transaction.rollback();
        console.error(error);
        return {
            code: 500,
            error: {
                details: [
                    {
                        service: "RequestedBookCreateService",
                        message: error.message, // Mostra a mensagem de erro real
                    },
                ],
            },
            message: "Erro ao cadastrar livro, notificação e registro em NotificationRequestedBook",
            success: false,
        };
    }
};

module.exports = RequestedBookCreateService;