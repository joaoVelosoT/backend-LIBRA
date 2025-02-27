const EventoDeleteService = require("../../services/EventosServices/EventoDeleteService.js");

const EventoDeleteController = async (req, res) => {
    try {

        const { id } = req.params;

        const evento = await EventoDeleteService.delete(id);

        res.status(200).json(evento);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            error: {
                details: [
                    {
                        controller: "EventoDeleteController",
                        message: "Erro interno",
                    },
                ],
            },
            message: "Erro no EventoDeleteController",
            success: false,
        });
    }
};

module.exports = EventoDeleteController;