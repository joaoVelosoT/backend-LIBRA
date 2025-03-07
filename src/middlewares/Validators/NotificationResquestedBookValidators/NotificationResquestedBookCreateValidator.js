const Notification = require("../../../models/Notification");
const RequestedBook = require("../../../models/RequestedBook");

const NotificationRequestedBookCreateValidator = async (req, res, next) => {
    try {
        const { idNotification, idRequestedBook } = req.body;
        const errors = [];

        // Validação do idNotification
        if (!idNotification || typeof idNotification !== "number") {
            errors.push({
                field: "idNotification",
                message: "O id da notificação é obrigatório e deve ser um número.",
            });
        } else {
            const notificationExists = await Notification.findByPk(idNotification);
            if (!notificationExists) {
                errors.push({
                    field: "idNotification",
                    message: "A notificação com o ID fornecido não existe.",
                });
            }
        }

        // Validação do idRequestedBook
        if (!idRequestedBook || typeof idRequestedBook !== "number") {
            errors.push({
                field: "idRequestedBook",
                message: "O id do livro solicitado é obrigatório e deve ser um número.",
            });
        } else {
            const requestedBookExists = await RequestedBook.findByPk(idRequestedBook);
            if (!requestedBookExists) {
                errors.push({
                    field: "idRequestedBook",
                    message: "O livro solicitado com o ID fornecido não existe.",
                });
            }
        }

        // Se houver erros, retorne-os
        if (errors.length > 0) {
            return res.status(400).json({
                code: 400,
                errors,
                message: "Erro ao validar NotificationRequestedBook",
                success: false,
            });
        }

        // Adiciona os dados validados ao request
        req.notificationRequestedBookData = { idNotification, idRequestedBook };
        return next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            code: 500,
            error: {
                details: [
                    {
                        validator: "NotificationRequestedBookCreateValidator",
                        message: "Erro interno",
                    },
                ],
            },
            message: "Erro no NotificationRequestedBookCreateValidator",
            success: false,
        });
    }
};

module.exports = NotificationRequestedBookCreateValidator;