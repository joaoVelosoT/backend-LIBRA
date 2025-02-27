const Evento = require("../../models/Evento");

const EventoGetByIdService = {

    getById: async (id) => {
        try {

            const eventos = await Evento.findByPk(id);

            if (eventos === null) {
                return {
                    code: 404,
                    data: eventos,
                    message: "Nenhum evento encontrado",
                    success: true,
                };
            }
            return {
                code: 200,
                data: eventos,
                message: "Evento obtida com sucesso",
                success: true,
            };

        } catch (error) {
            console.error(error);
            return {
                code: 500,
                error: {
                    details: [
                        {
                            service: "EventoGetByIdService",
                            message: "Erro interno ao buscar o Evento",
                        },
                    ],
                },
                message: "Erro ao buscar evento",
                success: false,
            };
        }
    }

};

module.exports = EventoGetByIdService;