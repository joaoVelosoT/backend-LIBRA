const NotificationAssistence = require("../../models/Notification_Assistence");
const Notification = require("../../models/Notification");
const sequelize = require("../../database/config");

const NotificationAssCreateService = {
    create: async (idEvento, idUser, data) => {
        const transaction = await sequelize.transaction();

        try {

            const dataNotification = {
                title: "Solicitação de Assistência",
                description: data,
                type: "Assistence"
            }

            if (dataNotification.description === "" || dataNotification.description === undefined) {
                return {
                    code: 500,
                    error: {
                        details: [
                            {
                                service: "NotificationAssCreateService",
                                message: "Erro interno ao criar um Notificação de assistência.",
                            },
                        ],
                    },
                    success: false,
                };
            }

            const createNotification = await Notification.create(dataNotification, { transaction });

            const dataNotificationAss = {
                notificao_id: createNotification.dataValues.id,
                user_id: idUser,
                evento_id: idEvento
            }

            const createNotificationAss = await NotificationAssistence.create(dataNotificationAss, { transaction });

            console.log(createNotificationAss);

            await transaction.commit();

            return {
                code: 200,
                createNotificationAss,
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
                            service: "NotificationAssCreateService",
                            message: "Erro interno ao criar um Notificação de assistência.",
                        },
                    ],
                },
                success: false,
            };
        }
    }
}


module.exports = NotificationAssCreateService;