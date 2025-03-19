const Evento = require("../../models/Evento");

const EventoGetByIdService = {
  getById: async (id) => {
    try {
      const evento = await Evento.findByPk(id, {
        include: [
          {
            association: "capa", 
            include: [
              {
                association: "arquivo", 
              },
            ],
          },
          {
            association: "gif", 
            include: [
              {
                association: "arquivo", 
              },
            ],
          },
        ],
      });

      if (!evento) {
        return {
          code: 404,
          data: null,
          message: "Nenhum evento encontrado",
          success: true,
        };
      }

      return {
        code: 200,
        data: evento,
        message: "Evento obtido com sucesso",
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
              message: error.message,
            },
          ],
        },
        message: "Erro ao buscar evento",
        success: false,
      };
    }
  },
};

module.exports = EventoGetByIdService;