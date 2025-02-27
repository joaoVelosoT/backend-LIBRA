const EventoGetByIdService = require('../../services/EventosServices/EventoGetByIdService.js');

const EventoGetByIdController = async (req, res) => {
    try {

        const { id } = req.params

        const eventos = await EventoGetByIdService.getById(id);

        return res.status(eventos.code).json(eventos);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            error: {
                details: [
                    {
                        controller: "EventoGetByIdController",
                        message: "Erro interno",
                    },
                ],
            },
            message: "Erro no EventoGetByIdController",
            success: false,
        });
    }
};

module.exports = EventoGetByIdController;