const EventoAddPictureService = require("../../services/EventosServices/EventoAddPictureService");

const EventoAddPictureController = async (req, res) => {
  try {
    console.log("Arquivos recebidos:", req.files); // Verifique os arquivos recebidos

    const { id } = req.params;
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
        message: "Erro ao atualizar as imagens",
        success: false,
      });
    }

    // Processa a capa, se enviada
    if (files.capa) {
      const resultCapa = await EventoAddPictureService(id, "capa", files.capa[0]);
      if (!resultCapa.success) {
        return res.status(resultCapa.code).json(resultCapa);
      }
    }

    // Processa o GIF, se enviado
    if (files.gif) {
      const resultGif = await EventoAddPictureService(id, "gif", files.gif[0]);
      if (!resultGif.success) {
        return res.status(resultGif.code).json(resultGif);
      }
    }

    return res.status(200).json({
      code: 200,
      message: "Imagens atualizadas com sucesso!",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      error: {
        details: [
          {
            controller: "EventoAddPictureController",
            message: "Erro interno",
          },
        ],
      },
      message: "Erro no EventoAddPictureController",
      success: false,
    });
  }
};

module.exports = EventoAddPictureController;