const Evento = require("../../models/Evento");

const EventoCreateService = {

    create: async (data) => {
        try {

            const evento = await Evento.create(data);

            return {
                code: 201,
                evento: {
                    id: evento.id,
                    titulo: evento.titulo,
                    descricao: evento.descricao,
                    data_evento: evento.data_evento,
                },
                message: "Evento criado com sucesso",
                success: true,
            };

        } catch (error) {
            console.error(error);
            return {
                code: 500,
                error: {
                    details: [
                        {
                            service: "EventoCreateService",
                            message: "Erro interno ao criar um Evento",
                        },
                    ],
                },
                message: "Erro ao cadastrar evento",
                success: false,
            };
        }

    }
};

module.exports = EventoCreateService;