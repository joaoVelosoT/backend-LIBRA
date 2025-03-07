const NotificationAssGetAllService = require("../../services/NotificationAssServices/NotificationAssGetAllService");

const NotificationAssgetAllController = async (req, res) => {
    try {

        const notifications = await NotificationAssGetAllService.getAll();

        res.status(notifications.code).json({
            notifications
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            error: {
                details: [
                    {
                        controller: "NotificationAssGetAllController",
                        message: "Erro interno",
                    },
                ],
            },
            message: "Erro no NotificationAssGetAllController",
            success: false,

        });
    }
};

module.exports = NotificationAssgetAllController;