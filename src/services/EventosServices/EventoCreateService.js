const Evento = require("../../models/Evento");
const CapaEvento = require("../../models/CapaEvento");
const GifEvento = require("../../models/GifEvento");
const Arquivos = require("../../models/Arquivos");
const sequelize = require("../../database/config");
const uploadCreateService = require("../uploadServices/uploadCreateService");

const EventoCreateService = {
  create: async (data, files) => {
    const transaction = await sequelize.transaction();

    try {

      // Cria o evento no banco de dados
      const evento = await Evento.create(data, { transaction });

      // Define o caminho base para as imagens no Google Cloud Storage
      const nomePasta = `eventos/${evento.titulo.replace(/\s+/g, "_")}`;

      // Upload da capa (se existir)
      let idCapa = null;
      if (files.capa) {
        const { originalname, buffer, mimetype } = files.capa[0];

        const uploadResult = await uploadCreateService.create(
          originalname,
          buffer,
          mimetype,
          "capa",
          nomePasta
        );

        if (!uploadResult.success) {
          await transaction.rollback();
          return uploadResult; // Retorna o erro do upload
        }

        // Cria o registro da capa
        const capa = await CapaEvento.create(
          {
            id_link: uploadResult.arquivoId,
          },
          { transaction }
        );

        idCapa = capa.id;
      }

      // Upload do GIF (se existir)
      let idGif = null;
      if (files.gif) {
        const { originalname, buffer, mimetype } = files.gif[0];

        const uploadResult = await uploadCreateService.create(
          originalname,
          buffer,
          mimetype,
          "gif",
          nomePasta
        );

        if (!uploadResult.success) {
          await transaction.rollback();
          return uploadResult; // Retorna o erro do upload
        }

        // Cria o registro do GIF
        const gif = await GifEvento.create(
          {
            id_link: uploadResult.arquivoId,
          },
          { transaction }
        );

        idGif = gif.id;
      }

      console.log(idCapa);


      // Atualiza o evento com os IDs da capa e do GIF
      evento.id_capa = idCapa;
      evento.id_Gif = idGif;
      await evento.save({ transaction });

      // Confirma a transação
      await transaction.commit();

      return {
        code: 201,
        evento: {
          id: evento.id,
          titulo: evento.titulo,
          descricao: evento.descricao,
          data_evento: evento.data_evento,
          id_capa: evento.id_capa,
          id_Gif: evento.id_Gif,
        },
        message: "Evento criado com sucesso",
        success: true,
      };
    } catch (error) {
      await transaction.rollback();
      console.error(error);
      return {
        code: 500,
        error: {
          details: [
            {
              service: "EventoCreateService",
              message: error.message,
            },
          ],
        },
        message: "Erro ao criar evento",
        success: false,
      };
    }
  },
};

module.exports = EventoCreateService;