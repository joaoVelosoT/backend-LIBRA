const BookCreateService = require("../../services/BookServices/BookCreateService");

const BookCreateController = async (req, res) => {
  try {
    const bookData = req.bookData;
    const files = req.files;

    const book = await BookCreateService(bookData, files);

    if (!book.success) {
      return res.status(book.code).json(book);
    }

    return res.status(book.code).json({
      code: book.code,
      data: book.book,
      message: book.message,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      error: {
        details: [
          {
            controller: "BookCreateController",
            message: "Erro interno",
          },
        ],
      },
      message: "Erro no BookCreateController",
      success: false,
    });
  }
};

module.exports = BookCreateController;