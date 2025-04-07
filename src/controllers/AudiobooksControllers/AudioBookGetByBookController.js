const AudioBookGetByBookService = require("../../services/AudioBookServices/AudioBookGetByBookService");

const AudioBookGetByBookController = async (req, res) => {
  try {
    const { idLivro } = req.params;
    
    const result = await AudioBookGetByBookService.getByBookId(idLivro);
    
    return res.status(result.code).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: "Erro interno no servidor",
      success: false,
      error: error.message
    });
  }
};

module.exports = AudioBookGetByBookController;