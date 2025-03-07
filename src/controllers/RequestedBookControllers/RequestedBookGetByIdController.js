const RequestedBookGetByIdService = require("../../services/RequestedBookServices/RequestedBookGetByIdService");

const RequestedBookGetByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await RequestedBookGetByIdService(id); 
        return res.status(response.code).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            code: 500,
            error: {
                details: [
                    {
                        controller: "RequestedBookGetByIdController",
                        message: "Erro interno",
                    },
                ],
            },
            message: "Erro no RequestedBookGetByIdController",
            success: false,
        });
    }
};

module.exports = RequestedBookGetByIdController;