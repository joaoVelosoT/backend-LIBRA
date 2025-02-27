const RequestedBookCreateService = require("../../services/RequestedBookServices/RequestedBookCreateService");

const RequestedBookCreateController = async (req, res) => {
    try {
        const result = await RequestedBookCreateService(req.RequestedBookData);
        return res.status(result.code).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            code: 500,
            error: {
                details: [
                    {
                        controller: "RequestedBookCreateController",
                        message: "Erro interno",
                    },
                ],
            },
            message: "Erro no RequestedBookCreateController",
            success: false,
        });
    }
};

module.exports = RequestedBookCreateController;