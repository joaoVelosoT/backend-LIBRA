const Evento = require("../../models/Evento");
const CapaEvento = require("../../models/CapaEvento");
const GifEvento = require("../../models/GifEvento");
const Arquivos = require("../../models/Arquivos");
const sequelize = require("../../database/config");
const uploadDeleteService = require("../uploadServices/uploadDeleteService");

const EventoDeleteService = {
  delete: async (id) => {
    const transaction = await sequelize.transaction();

    try {
      // Busca o evento pelo ID
      const evento = await Evento.findByPk(id, { transaction });

      if (!evento) {
        await transaction.rollback();
        return {
          code: 404,
          error: {
            details: [
              {
                message: "Evento não encontrado.",
              },
            ],
          },
          message: "Erro ao buscar evento por ID",
          success: false,
        };
      }

      // Define o caminho da pasta no Google Cloud Storage
      const nomePasta = `eventos/${evento.titulo.replace(/\s+/g, "_")}`;

      // Deleta a pasta do evento no Google Cloud Storage
      const deleteFolderResult = await uploadDeleteService.deleteFolder(nomePasta);

      if (!deleteFolderResult.success) {
        await transaction.rollback();
        return {
          code: deleteFolderResult.code,
          error: {
            details: [
              {
                message: deleteFolderResult.message,
              },
            ],
          },
          message: "Erro ao deletar pasta do evento",
          success: false,
        };
      }

      // Deleta a capa do evento (se existir)
      if (evento.id_capa) {
        const capa = await CapaEvento.findByPk(evento.id_capa, { transaction });

        if (capa) {
          const arquivoCapa = await Arquivos.findByPk(capa.id_link, { transaction });

          if (arquivoCapa) {
            // Deleta o arquivo da capa no Google Cloud Storage
            await uploadDeleteService.delete(arquivoCapa.id);
            // Deleta o registro da capa no banco de dados
            await capa.destroy({ transaction });
          }
        }
      }

      // Deleta o GIF do evento (se existir)
      if (evento.id_Gif) {
        const gif = await GifEvento.findByPk(evento.id_Gif, { transaction });

        if (gif) {
          const arquivoGif = await Arquivos.findByPk(gif.id_link, { transaction });

          if (arquivoGif) {
            // Deleta o arquivo do GIF no Google Cloud Storage
            await uploadDeleteService.delete(arquivoGif.id);
            // Deleta o registro do GIF no banco de dados
            await gif.destroy({ transaction });
          }
        }
      }

      // Deleta o evento
      await evento.destroy({ transaction });

      // Confirma a transação
      await transaction.commit();

      return {
        code: 200,
        message: "Evento e todos os arquivos associados deletados com sucesso!",
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
              message: error.message,
            },
          ],
        },
        message: "Erro ao deletar evento",
        success: false,
      };
    }
  },
};

module.exports = EventoDeleteService;