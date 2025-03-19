const EventoUpdateService = require("../../services/EventosServices/EventoUpdateService");

const EventoUpdateController = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body; // Dados do evento (título, categoria, descrição, data)

    // Chama o service para atualizar os dados do evento
    const result = await EventoUpdateService.update(id, data);

    return res.status(result.code).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      error: {
        details: [
          {
            controller: "EventoUpdateController",
            message: "Erro interno",
          },
        ],
      },
      message: "Erro no EventoUpdateController",
      success: false,
    });
  }
};

module.exports = EventoUpdateController;