const AudiobookDeleteService = require("../../services/AudioBookServices/AudioBookDeleteService")

const AudiobookDeleteController = async (req, res) => {
    try {
        const { id } = req.params; // Pega o ID do livro a ser deletado

        const result = await AudiobookDeleteService.delete(id);

        if (result.success) {
            res.json({ message: result.message });
        } else {
            res.status(result.code).json(result);
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            code: 500,
            error: {
                details: [
                    {
                        controller: "audioBookDeleteController",
                        message: "Erro interno",
                    },
                ],
            },
            message: "Erro no audioBookDeleteController",
            success: false,
        });
    }
}

module.exports = AudiobookDeleteController;