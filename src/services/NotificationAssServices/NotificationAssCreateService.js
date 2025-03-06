const NotificationAssistence = require("../../models/Notification_Assistence");
const Notification = require("../../models/Notification");
const sequelize = require("../../database/config");

const NotificationAssCreateService = {
    create: async (idEvento, idUser, data) => {
        const transaction = await sequelize.transaction();

        try {

            console.log(data);

            const dataNotification = {
                title: "Solicitação de Assistência",
                description: data,
                type: "Assistence"
            }

            console.log(dataNotification.description);


            if (dataNotification.description === "" || dataNotification.description === undefined) {
                return {
                    code: 500,
                    error: {
                        details: [
                            {
                                service: "NotificationAssCreateService",
                                message: "Erro interno ao criar um NOtificação de assistência.",
                            },
                        ],
                    },
                    success: false,
                };
            }

            const createNotification = await Notification.create(dataNotification, { transaction });




            await transaction.commit();



            return {
                code: 200,
                createNotification,
                success: true,
            };

        } catch (error) {
            console.error(error);
            return {
                code: 500,
                error: {
                    details: [
                        {
                            service: "NotificationAssCreateService",
                            message: "Erro interno ao criar um NOtificação de assistência.",
                        },
                    ],
                },
                success: false,
            };
        }
    }
}


module.exports = NotificationAssCreateService;