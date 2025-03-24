const BookGetByIdService = require("../../services/BookServices/BookGetByIdService");

const BookGetByIdController = async (req, res) => {
  try {
    const { id } = req.params; // Pega o ID do livro da rota

    const result = await BookGetByIdService(id);

    if (!result.success) {
      return res.status(result.code).json(result);
    }

    return res.status(result.code).json({
      code: result.code,
      data: result.data,
      message: result.message,
      success: result.success,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      error: {
        details: [
          {
            controller: "BookGetByIdController",
            message: "Erro interno",
          },
        ],
      },
      message: "Erro no BookGetByIdController",
      success: false,
    });
  }
};

module.exports = BookGetByIdController;