const Evento = require("../../models/Evento");
const CapaEvento = require("../../models/CapaEvento");
const GifEvento = require("../../models/GifEvento");
const Arquivos = require("../../models/Arquivos");

const EventoGetAllService = {
  getAll: async () => {
    try {
      const eventos = await Evento.findAll({
        include: [
          {
            model: CapaEvento,
            as: "capa",
            include: [
              {
                model: Arquivos,
                as: "arquivo",
              },
            ],
          },
          {
            model: GifEvento,
            as: "gif",
            include: [
              {
                model: Arquivos,
                as: "arquivo",
              },
            ],
          },
        ],
      });

      if (eventos.length === 0) {
        return {
          code: 200,
          data: [],
          message: "Nenhum evento encontrado",
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
              message: error.message,
            },
          ],
        },
        message: "Erro ao buscar eventos",
        success: false,
      };
    }
  },
};

module.exports = EventoGetAllService;