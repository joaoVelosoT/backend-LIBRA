const AudioBookDeleteByBookService = require("../../services/AudioBookServices/AudioBookDeleteByBookService");

const AudioBookDeleteByBookController = async (req, res) => {
  try {
    const { idLivro } = req.params;
    
    const result = await AudioBookDeleteByBookService.deleteByBookId(idLivro);
    
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

module.exports = AudioBookDeleteByBookController;