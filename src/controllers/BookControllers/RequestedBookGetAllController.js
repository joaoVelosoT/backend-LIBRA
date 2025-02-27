const BookGetAllService = require("../../services/RequestedBookServices/RequestedBookGetAllService");

const BookGetAllController = async (req, res) => {
    try {
        const response = await BookGetAllService();
        return res.status(response.code).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            code: 500,
            error: {
                details: [
                    {
                        controller: "BookGetAllController",
                        message: "Erro interno",
                    },
                ],
            },
            message: "Erro no BookGetAllController",
            success: false,
        });
    }
};

module.exports = BookGetAllController;