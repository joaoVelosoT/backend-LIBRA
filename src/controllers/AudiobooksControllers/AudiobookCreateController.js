// controllers/AudioBooksControllers/AudioBookCreateController.js
const AudioBookCreateService = require("../../services/AudioBookServices/AudioBookCreateService");
const Book = require("../../models/Book");

const AudioBookCreateController = async (req, res) => {
  try {
    const { idLivro } = req.audioBookData;
    const files = req.files;

    const book = await Book.findByPk(idLivro);
    if (!book) {
      return res.status(404).json({
        code: 404,
        message: "Livro não encontrado",
        success: false
      });
    }

    const nomeLivro = `livros/${book.titulo.replace(/\s+/g, "_")}`;
    const result = await AudioBookCreateService.create(nomeLivro, req.audioBookData, files);

    // Atualiza o livro com o ID do audiobook criado
    await book.update({ id_Audiobook: result.data[0].id });

    if (!result.success) {
      return res.status(result.code).json(result);
    }

    return res.status(result.code).json({
      code: result.code,
      data: result.data,
      message: result.message,
      success: true
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      error: {
        details: [{
          controller: "AudioBookCreateController",
          message: error.message
        }]
      },
      message: "Erro no AudioBookCreateController",
      success: false
    });
  }
};

module.exports = AudioBookCreateController;