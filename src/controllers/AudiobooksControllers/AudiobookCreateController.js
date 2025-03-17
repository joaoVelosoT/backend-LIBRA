const AudioBookCreateService = require("../../services/AudioBookServices/AudioBookCreateService.js");
const Book = require("../../models/Book.js");
const { where } = require("sequelize");

const AudioBookCreateController = async (req, res) => {
    try {
        const { nomeLivro, publicacao } = req.body;

        const result = await Book.findOne({
            where: {
                titulo: nomeLivro
            }
        })

        if (!result) {
            res.status(500).json({
                erro: "Falha ao buscar livro!"
            })
        }

        console.log(result);

        const files = req.files;

        console.log(result.data.titulo);

        const nomeLivroCorrect = result.data.titulo.replace(/\s+/g, "_");


        const audioBook = await AudioBookCreateService.create(nomeLivroCorrect, publicacao, files)

        if (!audioBook.success) {
            return res.status(audioBook.code).json(audioBook);
        }

        // const updateBook = await Book.update({
        //     where: {
        //         titulo: nomeLivro
        //     }, 
        // })

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