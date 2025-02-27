const RequestedBookDeleteService = require("../../services/RequestedBookServices/RequestedBookDeleteService");

const RequestedBookDeleteController = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await RequestedBookDeleteService(id); 
        if (!response.success) {
            return res.status(response.code).json(response);
        }

        // Retorna a resposta de sucesso
        return res.status(response.code).json({
            code: response.code,
            data: response.RequestedBook,
            message: response.message,
            success: response.success,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            code: 500,
            error: {
                details: [
                    {
                        controller: "RequestedBookDeleteController",
                        message: "Erro interno",
                    },
                ],
            },
            message: "Erro no RequestedBookDeleteController",
            success: false,
        });
    }
};

module.exports = RequestedBookDeleteController;