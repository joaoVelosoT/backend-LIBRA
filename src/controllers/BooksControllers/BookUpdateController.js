const BookUpdateService = require("../../services/BookServices/BookUpdateService");

const BookUpdateController = async (req, res) => {
  try {
    const { id } = req.params; // ID do livro a ser atualizado
    const bookData = req.body; // Dados parciais enviados pelo usuário (ex: título, autor)
    const files = req.files; // Arquivos enviados (capa, banner)

    // Chama o serviço de atualização
    const updatedBook = await BookUpdateService(id, bookData, files);

    // Se a atualização falhar, retorna o erro
    if (!updatedBook.success) {
      return res.status(updatedBook.code).json(updatedBook);
    }

    // Retorna sucesso
    return res.status(updatedBook.code).json({
      code: updatedBook.code,
      data: updatedBook.book,
      message: updatedBook.message,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      error: {
        details: [
          {
            controller: "BookUpdateController",
            message: "Erro interno no servidor",
          },
        ],
      },
      message: "Erro no BookUpdateController",
      success: false,
    });
  }
};

module.exports = BookUpdateController;