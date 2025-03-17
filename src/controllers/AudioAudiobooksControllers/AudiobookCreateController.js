const AudioBookCreateService = require("../../services/AudioBookServices/AudioBookCreateService.js");

const AudioBookCreateController = async (req, res) => {
    try {

        console.log(req.body);

        const { nomeLivro, publicacao } = req.body;

        console.log(nomeLivro);

        console.log(publicacao);

        const files = req.files;

        const audioBook = await AudioBookCreateService.create(nomeLivro, publicacao, files)

        if (!audioBook.success) {
            return res.status(audioBook.code).json(audioBook);
        }

        return res.status(audioBook.code).json({
            code: audioBook.code,
            data: audioBook.AudioBooks,
            message: audioBook.message,
            success: true,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            code: 500,
            error: {
                details: [
                    {
                        controller: "AudioBookCreateController",
                        message: "Erro interno",
                    },
                ],
            },
            message: "Erro no AudioBookCreateController",
            success: false,
        });
    }
}

module.exports = AudioBookCreateController;