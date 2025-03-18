const AudioBookCreateService = require("../../services/AudioBookServices/AudioBookCreateService.js");
const Book = require("../../models/Book.js");

const AudioBookCreateController = async (req, res) => {
    try {
        const { idLivro, publicacao } = req.body;
        const files = req.files;

        // Busca o livro pelo ID
        const book = await Book.findByPk(idLivro);

        if (!book) {
            return res.status(404).json({
                error: "Livro não encontrado!"
            });
        }

        const nomeLivro = book.dataValues.titulo.replace(/\s+/g, "_");

        // Cria o audiobook
        const audioBookResult = await AudioBookCreateService.create(nomeLivro, publicacao, files);

        if (!audioBookResult.success) {
            return res.status(audioBookResult.code).json(audioBookResult);
        }

        // Atualiza o livro com o ID do audiobook criado
        await book.update({ id_Audiobook: audioBookResult.AudioBooks.id });

        return res.status(audioBookResult.code).json({
            code: audioBookResult.code,
            data: {
                book: book,
                audioBook: audioBookResult.AudioBooks
            },
            message: "Audiobook criado e livro atualizado com sucesso!",
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