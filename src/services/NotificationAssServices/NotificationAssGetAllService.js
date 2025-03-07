const NotificationAssistence = require("../../models/Notification_Assistence");

const NotificationAssGetAllService = {
    getAll: async () => {
        try {

            const notificationsAss = await NotificationAssistence.findAll();

            if (!notificationsAss) {
                return {
                    code: 404,
                    error: "Nenhuma notificação de assistência encontrada!",
                    sucess: false
                }
            }

            return {
                code: 200,
                notificações: notificationsAss,
                success: true
            }


        } catch (error) {
            console.error(error);
            return {
                code: 500,
                error: {
                    details: [
                        {
                            service: "NotificationAssGetAllService",
                            message: "Erro interno ao buscar uma Notificação de assistência.",
                        },
                    ],
                },
                success: false,
            };
        }
    }
}


module.exports = NotificationAssGetAllService;