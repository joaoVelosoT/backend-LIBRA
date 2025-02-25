const EventoGetAllService = require('../../services/EventosServices/EventoGetAllService');

const EventoGetAllController = async (req, res) => {
    try {

        const eventos = await EventoGetAllService();

        return res.status(eventos.code).json(eventos);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            error: {
                details: [
                    {
                        controller: "EventoGetAllController",
                        message: "Erro interno",
                    },
                ],
            },
            message: "Erro no EventoGetAllController",
            success: false,
        });
    }
};

module.exports = EventoGetAllController;