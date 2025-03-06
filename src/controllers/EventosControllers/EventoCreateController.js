const EventoCreateService = require("../../services/EventosServices/EventoCreateService");

const EventoCreateController = async (req, res) => {
    try {

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

        const evento = await EventoCreateService.create(data);

        return res.status(evento.code).json(evento);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            error: {
                details: [
                    {
                        controller: "EventoCreateController",
                        message: "Erro interno",
                    },
                ],
            },
            message: "Erro no EventoCreateController",
            success: false,
        });
    }
};

module.exports = EventoCreateController;