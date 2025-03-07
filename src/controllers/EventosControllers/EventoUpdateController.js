const EventoUpdateService = require("../../services/EventosServices/EventoUpdateService.js");

const EventoUpdateController = async (req, res) => {
    try {

        const { id } = req.params;

        const data = req.body;


        if (data.titulo === "" || data === undefined) {
            return res.status(400).json({
                code: 400,
                error: {
                    details: "TItulo do Evento não pode ser vazio!"
                },
                message: "Erro no typeDisabledCreateController",
                sucess: false,
            });
        }

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