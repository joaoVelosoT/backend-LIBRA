const NotificationRequestedBook = require("../../models/NotificationRequestedBook");

const NotificationRequestedBookCreateService = async (data, transaction = null) => {
    try {
        // Verificar se os IDs são válidos
        if (!data.idNotification || !data.idRequestedBook) {
            return {
                code: 400,
                error: {
                    details: [
                        {
                            field: "idNotification/idRequestedBook",
                            message: "Os IDs da notificação e do livro solicitado são obrigatórios.",
                        },
                    ],
                },
                message: "Erro ao validar NotificationRequestedBookCreate",
                success: false,
            };
        }

        // Verificar se já existe um registro com os mesmos IDs
        const existingNotificationRequestedBook = await NotificationRequestedBook.findOne({
            where: {
                idNotification: data.idNotification,
                idRequestedBook: data.idRequestedBook,
            },
            transaction,
        });

        if (existingNotificationRequestedBook) {
            return {
                code: 409,
                error: {
                    details: [
                        {
                            field: "idNotification/idRequestedBook",
                            message: "Já existe um registro com esses IDs.",
                        },
                    ],
                },
                message: "Erro ao validar NotificationRequestedBookCreate",
                success: false,
            };
        }

        // Criar o registro na tabela NotificationRequestedBook
        const newNotificationRequestedBook = await NotificationRequestedBook.create(data, { transaction });

        return {
            code: 201,
            data: newNotificationRequestedBook,
            message: "Registro em NotificationRequestedBook criado com sucesso",
            success: true,
        };
    } catch (error) {
        console.error(error);
        return {
            code: 500,
            error: {
                details: [
                    {
                        service: "NotificationRequestedBookCreateService",
                        message: error.message, // Mostra a mensagem de erro real
                    },
                ],
            },
            message: "Erro ao criar registro em NotificationRequestedBook",
            success: false,
        };
    }
};

module.exports = NotificationRequestedBookCreateService;