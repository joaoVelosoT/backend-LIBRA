const NotificationRequestedBookCreateService = require("../../services/NotificationRequestedBookServices/NotificationRequestedBookCreateService");

const NotificationRequestedBookCreateController = async (req, res) => {
    try {
        const result = await NotificationRequestedBookCreateService(req.notificationRequestedBookData);
        return res.status(result.code).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            code: 500,
            error: {
                details: [
                    {
                        controller: "NotificationRequestedBookCreateController",
                        message: "Erro interno",
                    },
                ],
            },
            message: "Erro no NotificationRequestedBookCreateController",
            success: false,
        });
    }
};

module.exports = NotificationRequestedBookCreateController;