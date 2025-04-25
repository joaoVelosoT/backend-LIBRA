const AudioBookUpdateService = require("../../services/AudioBookServices/AudioBookUpdateService");

const AudioBookUpdateController = async (req, res) => {
    try {
        const { id } = req.params;
        const files = req.files;

        // Chama o serviço de atualização
        const updatedAudioBook = await AudioBookUpdateService(id, files);

        if (!updatedAudioBook.success) {
            return res.status(updatedAudioBook.code).json(updatedAudioBook);
        }

        return res.status(updatedAudioBook.code).json({
            code: updatedAudioBook.code,
            data: updatedAudioBook.AudioBook,
            message: updatedAudioBook.message,
            success: true,
        });
    } catch (error) {
        return res.status(500).json({
            code: 500,
            error: {
                details: [
                    {
                        controller: "AudioBookUpdateController",
                        message: "Erro interno no servidor",
                    },
                ],
            },
            message: "Erro no AudioBookUpdateController",
            success: false,
        });
    }
};

module.exports = AudioBookUpdateController;