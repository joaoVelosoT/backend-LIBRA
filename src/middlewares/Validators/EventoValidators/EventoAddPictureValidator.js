const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];

const EventoAddPictureValidator = async (req, res, next) => {
  try {
    const files = req.files;

    // Verifica se pelo menos um arquivo foi enviado
    if (!files || (!files.capa && !files.gif)) {
      return res.status(400).json({
        code: 400,
        error: {
          details: [
            {
              field: "arquivos",
              message: "Pelo menos um arquivo (capa ou gif) deve ser enviado.",
            },
          ],
        },
        message: "Erro ao validar os arquivos",
        success: false,
      });
    }

    // Valida a capa, se enviada
    if (files.capa) {
      const capa = files.capa[0];
      if (!allowedMimeTypes.includes(capa.mimetype)) {
        return res.status(400).json({
          code: 400,
          error: {
            details: [
              {
                field: "capa",
                message: "Apenas arquivos JPEG, PNG e GIF são permitidos.",
              },
            ],
          },
          message: "Erro ao validar a capa",
          success: false,
        });
      }
    }

    // Valida o GIF, se enviado
    if (files.gif) {
      const gif = files.gif[0];
      if (!allowedMimeTypes.includes(gif.mimetype)) {
        return res.status(400).json({
          code: 400,
          error: {
            details: [
              {
                field: "gif",
                message: "Apenas arquivos JPEG, PNG e GIF são permitidos.",
              },
            ],
          },
          message: "Erro ao validar o GIF",
          success: false,
        });
      }
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      error: {
        details: [
          {
            validator: "EventoAddPictureValidator",
            message: "Erro interno",
          },
        ],
      },
      message: "Erro no EventoAddPictureValidator",
      success: false,
    });
  }
};

module.exports = EventoAddPictureValidator;