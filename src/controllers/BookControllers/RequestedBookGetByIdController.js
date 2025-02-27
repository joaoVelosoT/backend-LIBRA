const BookGetByIdService = require("../../services/RequestedBookServices/RequestedBookGetByIdService");

const BookGetByIdController = async (req, res) => {
    try {
        const { id } = req.params; // Obtém o ID do livro a partir dos parâmetros da requisição
        const response = await BookGetByIdService(id); // Chama o serviço para buscar o livro pelo ID
        return res.status(response.code).json(response); // Retorna a resposta com o status e os dados
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            code: 500,
            error: {
                details: [
                    {
                        controller: "BookGetByIdController",
                        message: "Erro interno",
                    },
                ],
            },
            message: "Erro no BookGetByIdController",
            success: false,
        });
    }
};

module.exports = BookGetByIdController;