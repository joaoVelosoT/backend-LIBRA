const RequestedBookGetAllService = require("../../services/RequestedBookServices/RequestedBookGetAllService");

const RequestedBookGetAllController = async (req, res) => {
    try {
        const response = await RequestedBookGetAllService();
        return res.status(response.code).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            code: 500,
            error: {
                details: [
                    {
                        controller: "RequestedBookGetAllController",
                        message: "Erro interno",
                    },
                ],
            },
            message: "Erro no RequestedBookGetAllController",
            success: false,
        });
    }
};

module.exports = RequestedBookGetAllController;