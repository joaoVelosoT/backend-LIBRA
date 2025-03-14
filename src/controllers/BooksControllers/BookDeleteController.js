const BookDeleteService = require("../../services/BookServices/BookDeleteService");

const BookDeleteController = async (req, res) => {
  try {
    const { id } = req.params; // Pega o ID do livro a ser deletado

    const result = await BookDeleteService(id);

    if (result.success) {
      res.json({ message: result.message });
    } else {
      res.status(result.code).json(result);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: 500,
      error: {
        details: [
          {
            controller: "BookDeleteController",
            message: "Erro interno",
          },
        ],
      },
      message: "Erro no BookDeleteController",
      success: false,
    });
  }
};

module.exports = BookDeleteController;