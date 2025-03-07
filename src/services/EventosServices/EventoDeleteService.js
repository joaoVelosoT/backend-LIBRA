const Evento = require("../../models/Evento");

const EventoDeleteService = {
    delete: async (id) => {
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

            await eventos.destroy();

            return {
                code: 200,
                message: "Evento Deletado com sucesso!",
                success: true
            };


        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }
};

module.exports = EventoDeleteService;