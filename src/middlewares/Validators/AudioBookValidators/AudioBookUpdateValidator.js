// middlewares/Validators/AudioBookValidators/AudioBookUpdateValidator.js
const AudioBookUpdateValidator = async (req, res, next) => {
    try {
      const { publicacao, ordem } = req.body;
      const errors = [];
  
      if (publicacao && isNaN(Date.parse(publicacao))) {
        errors.push({
          field: "publicacao",
          message: "Data de publicação inválida"
        });
      }
  
      if (ordem && isNaN(ordem)) {
        errors.push({
          field: "ordem",
          message: "Ordem deve ser um número"
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
        publicacao: publicacao || null,
        ordem: ordem ? parseInt(ordem) : null
      };
  
      return next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        code: 500,
        error: {
          details: [{
            validator: "AudioBookUpdateValidator",
            message: error.message
          }]
        },
        message: "Erro no validador de audiobook",
        success: false
      });
    }
  };
  
  module.exports = AudioBookUpdateValidator;