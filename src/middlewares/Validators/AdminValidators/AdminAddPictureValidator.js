const AdminAddPictureValidator = async (req, res, next) => {
    try {
      const imagemPerfil = req.file;
  
      if (!imagemPerfil) {
        return res.status(400).json({
          code: 400,
          error: {
            details: [
              {
                field: "imagemPerfil",
                message: "A imagem de perfil é obrigatória.",
              },
            ],
          },
          message: "Erro ao validar a imagem de perfil",
          success: false,
        });
      }
  
      // Valida o tipo de arquivo (opcional)
      const allowedMimeTypes = ["image/jpeg", "image/png"];
      if (!allowedMimeTypes.includes(imagemPerfil.mimetype)) {
        return res.status(400).json({
          code: 400,
          error: {
            details: [
              {
                field: "imagemPerfil",
                message: "Apenas arquivos JPEG e PNG são permitidos.",
              },
            ],
          },
          message: "Erro ao validar a imagem de perfil",
          success: false,
        });
      }
  
      // Passa para o próximo middleware
      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        code: 500,
        error: {
          details: [
            {
              validator: "AdminAddPictureValidator",
              message: "Erro interno",
            },
          ],
        },
        message: "Erro no AdminAddPictureValidator",
        success: false,
      });
    }
  };
  
  module.exports = AdminAddPictureValidator;