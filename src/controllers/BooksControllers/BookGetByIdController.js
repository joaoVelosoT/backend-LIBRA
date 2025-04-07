// controllers/booksControllers/bookGetOneController.js
const bookGetOneService = require("../../services/BookServices/BookGetByIdService");

const bookGetOneController = async (req, res) => {
  try {
    const result = await bookGetOneService(req.params.id);
    return res.status(result.code).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      error: {
        details: [
          {
            controller: "bookGetOneController",
            message: "Erro interno",
          },
        ],
      },
      message: "Erro no bookGetOneController",
      success: false,
    });
  }
};

module.exports = bookGetOneController;