const Evento = require("../../models/Evento");

const EventoGetAllService = async () => {
    try {

        const eventos = await Evento.findAll();

        if (eventos.length === 0) {
            return {
                code: 404,
                data: eventos,
                message: "Nenhuma evento encontrado",
                success: true,
            };
        }
        return {
            code: 200,
            data: eventos,
            message: "Lista de eventos obtida com sucesso",
            success: true,
        };

    } catch (error) {
        console.error(error);
        return {
            code: 500,
            error: {
                details: [
                    {
                        service: "EventoGetAllService",
                        message: "Erro interno ao buscar os Eventos",
                    },
                ],
            },
            message: "Erro ao buscar evento",
            success: false,
        };
    }

};

module.exports = EventoGetAllService;