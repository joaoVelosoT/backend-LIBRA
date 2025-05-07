const EbookCreateService = require("../../services/EbookServices/EbookCreateService.js");
const Book = require("../../models/Book.js");

const EbookCreateController = async (req, res) => {
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

    const ebookResult = await EbookCreateService.create(nomeLivro, publicacao, files);

    if (!ebookResult.success) {
      return res.status(ebookResult.code).json(ebookResult);
    }

    // Atualiza o livro com o ID do Ebook criado
    await book.update({ id_ebook: ebookResult.ebooks.id });

    return res.status(ebookResult.code).json({
      code: ebookResult.code,
      data: {
        book: book,
        audioBook: ebookResult.ebooks
      },
      message: "Ebook criado e livro atualizado com sucesso!",
      success: true,
    });


  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      error: {
        details: [
          {
            controller: "EbookCreateController",
            message: "Erro interno",
          },
        ],
      },
      message: "Erro no EbookCreateController",
      success: false,
    });
  }
}

module.exports = EbookCreateController;