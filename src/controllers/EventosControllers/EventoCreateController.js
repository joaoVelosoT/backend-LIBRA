const EventoCreateService = require("../../services/EventosServices/EventoCreateService");

const EventoCreateController = async (req, res) => {
    try {

        const data = req.body;

        const evento = await EventoCreateService(data);

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