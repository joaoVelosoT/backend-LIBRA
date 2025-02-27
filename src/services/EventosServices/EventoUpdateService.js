
const Evento = require("../../models/Evento");


const EventoUpdateService = {
    update: async (id, data) => {
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

            const eventoUpdate = await Evento.update(data, {
                where: {
                    id: id
                }
            });

            return {
                code: 200,
                data: {
                    eventoUpdate
                },
                message: 'Evento atualizado com sucesso!',
                success: true
            }



        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

}

module.exports = EventoUpdateService;