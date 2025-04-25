const Evento = require("../../models/Evento");
const sequelize = require("../../database/config");
const { Storage } = require("@google-cloud/storage");
const CapaEvento = require("../../models/CapaEvento");
const GifEvento = require("../../models/GifEvento");
const Arquivos = require("../../models/Arquivos");
const path = require("path");

const storage = new Storage({
  keyFilename: path.join(__dirname, "../../database/libra-453101-6caaf8b9ebee.json"),
});
const bucketName = "libra_tcc"; // Nome do bucket no GCS

const EventoUpdateService = {
  update: async (id, data) => {
    const transaction = await sequelize.transaction();

    try {
      const evento = await Evento.findByPk(id, { transaction });

      if (!evento) {
        await transaction.rollback();
        return {
          code: 404,
          error: { details: [{ message: "Evento não encontrado." }] },
          message: "Erro ao buscar evento por ID",
          success: false,
        };
      }

      const nomePastaAntiga = `eventos/${evento.titulo.replace(/\s+/g, "_")}`;
      const nomePastaNova = `eventos/${(data.titulo || evento.titulo).replace(/\s+/g, "_")}`;

      if (data.titulo && data.titulo !== evento.titulo) {
        // Move os arquivos no GCS
        const [arquivos] = await storage.bucket(bucketName).getFiles({ prefix: nomePastaAntiga });

        await Promise.all(
          arquivos.map(async (file) => {
            const novoNome = file.name.replace(nomePastaAntiga, nomePastaNova);
            await file.move(novoNome);
          })
        );

        // Atualiza os URLs no banco de dados
        if (evento.id_capa) {
          const capa = await CapaEvento.findByPk(evento.id_capa, { transaction });
          if (capa) {
            const arquivoCapa = await Arquivos.findByPk(capa.id_link, { transaction });
            if (arquivoCapa) {
              const novoUrl = arquivoCapa.url.replace(nomePastaAntiga, nomePastaNova);
              await arquivoCapa.update({ url: novoUrl }, { transaction });
            }
          }
        }

        if (evento.id_Gif) {
          const gif = await GifEvento.findByPk(evento.id_Gif, { transaction });
          if (gif) {
            const arquivoGif = await Arquivos.findByPk(gif.id_link, { transaction });
            if (arquivoGif) {
              const novoUrl = arquivoGif.url.replace(nomePastaAntiga, nomePastaNova);
              await arquivoGif.update({ url: novoUrl }, { transaction });
            }
          }
        }

        evento.titulo = data.titulo;
      }

      await evento.update(data, { transaction });
      await transaction.commit();

      return {
        code: 200,
        data: evento,
        message: "Evento atualizado com sucesso!",
        success: true,
      };
    } catch (error) {
      await transaction.rollback();
      console.error("Erro ao atualizar evento:", error);
      return {
        code: 500,
        error: { details: [{ message: error.message }] },
        message: "Erro ao atualizar evento",
        success: false,
      };
    }
  },
};

module.exports = EventoUpdateService;