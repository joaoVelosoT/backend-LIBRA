const AudiobookDeleteService = require("../../services/AudioBookServices/AudioBookDeleteService");

const AudiobookDeleteController = async (req, res) => {
    try {
        const { id } = req.params; // Pega o ID do audiobook a ser deletado

        const result = await AudiobookDeleteService.delete(id);

        if (result.success) {
            res.status(result.code).json({
                message: result.message,
                data: result.audiobook,
                success: true,
            });
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
                        controller: "AudiobookDeleteController",
                        message: "Erro interno",
                    },
                ],
            },
            message: "Erro no AudiobookDeleteController",
            success: false,
        });
    }
}

module.exports = AudiobookDeleteController;