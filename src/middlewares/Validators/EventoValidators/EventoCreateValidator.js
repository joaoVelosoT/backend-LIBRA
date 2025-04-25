const EventoCreateValidator = async (req, res, next) => {
    try {
      const { titulo } = req.body;
      const files = req.files;
  
      if (!titulo || titulo === "") {
        return res.status(400).json({
          code: 400,
          error: {
            details: "Título do Evento não pode ser vazio!",
          },
          message: "Erro no EventoCreateValidator",
          success: false,
        });
      }
  
      if (!files.capa || !files.gif) {
        return res.status(400).json({
          code: 400,
          error: {
            details: "Capa e GIF são obrigatórios!",
          },
          message: "Erro no EventoCreateValidator",
          success: false,
        });
      }
  
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({
        code: 500,
        error: {
          details: [
            {
              validator: "EventoCreateValidator",
              message: "Erro interno",
            },
          ],
        },
        message: "Erro no EventoCreateValidator",
        success: false,
      });
    }
  };
  
  module.exports = EventoCreateValidator;