const BookGetAllService = require("../../services/BookServices/BookGetAllService");

const BookGetAllController = async (req, res) => {
  try {
    
    const result = await BookGetAllService(req.query);
    console.log("Resultado do serviço:", result);

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
            controller: "BookGetAllController",
            message: "Erro interno",
          },
        ],
      },
      message: "Erro no BookGetAllController",
      success: false,
    });
  }
};

module.exports = BookGetAllController;