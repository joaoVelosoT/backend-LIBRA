const EventoUpdateService = require("../../services/EventosServices/EventoUpdateService.js");

const EventoUpdateController = async (req, res) => {
    try {

        const { id } = req.params;

        const data = req.body;

        const evento = await EventoUpdateService.update(id, data);

        return res.status(evento.code).json(evento);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            code: 500,
            error: {
                details: [
                    { controller: "EventoUpdateController", message: "Erro interno" },
                ],
            },
            message: "Erro no EventoUpdateController",
            sucess: false,
        });
    }
}

module.exports = EventoUpdateController;