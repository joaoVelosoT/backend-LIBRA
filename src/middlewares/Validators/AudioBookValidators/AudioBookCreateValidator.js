// middlewares/Validators/AudioBookValidators/AudioBookCreateValidator.js
const AudioBookCreateValidator = async (req, res, next) => {
    try {
      const { idLivro, publicacao } = req.body;
      const errors = [];
  
      if (!idLivro || isNaN(idLivro)) {
        errors.push({
          field: "idLivro",
          message: "ID do livro é obrigatório e deve ser um número"
        });
      }
  
      if (publicacao && isNaN(Date.parse(publicacao))) {
        errors.push({
          field: "publicacao",
          message: "Data de publicação inválida"
        });
      }
  
      if (!req.files?.audioBook || req.files.audioBook.length === 0) {
        errors.push({
          field: "audioBook",
          message: "Pelo menos um arquivo de áudio é obrigatório"
        });
      }
  
      if (errors.length > 0) {
        return res.status(400).json({
          code: 400,
          errors,
          message: "Erro na validação do audiobook",
          success: false
        });
      }
  
      req.audioBookData = {
        idLivro: parseInt(idLivro),
        publicacao: publicacao || null
      };
  
      return next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        code: 500,
        error: {
          details: [{
            validator: "AudioBookCreateValidator",
            message: error.message
          }]
        },
        message: "Erro no validador de audiobook",
        success: false
      });
    }
  };
  
  module.exports = AudioBookCreateValidator;