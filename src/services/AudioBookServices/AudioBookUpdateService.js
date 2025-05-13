// services/AudioBookServices/AudioBookUpdateService.js
const AudioBook = require("../../models/Audiobook");
const Arquivos = require("../../models/Arquivos");
const sequelize = require("../../database/config");
const uploadCreateService = require("../uploadServices/uploadCreateService");

const AudioBookUpdateService = {
  update: async (id, audioBookData, files) => {
    const transaction = await sequelize.transaction();
    try {
      const audioBook = await AudioBook.findByPk(id, { transaction });
      if (!audioBook) {
        await transaction.rollback();
        return {
          code: 404,
          message: "Audiobook não encontrado",
          success: false
        };
      }

      // Atualiza campos básicos
      if (audioBookData.publicacao) {
        audioBook.publicacao = audioBookData.publicacao;
      }
      if (audioBookData.ordem) {
        audioBook.ordem = audioBookData.ordem;
      }

      // Atualiza arquivo se fornecido
      if (files?.audioBook?.[0]) {
        const { originalname, buffer, mimetype } = files.audioBook[0];
        
        // Primeiro deleta o arquivo antigo se existir
        if (audioBook.id_arquivo) {
          const arquivo = await Arquivos.findByPk(audioBook.id_arquivo, { transaction });
          if (arquivo) {
            await arquivo.destroy({ transaction });
          }
        }

        // Cria novo arquivo
        const uploadResult = await uploadCreateService.create(
          originalname,
          buffer,
          mimetype,
          "audioBook",
          `livro_${audioBook.id_livro}`
        );

        if (!uploadResult.success) {
          await transaction.rollback();
          return uploadResult;
        }

        audioBook.id_arquivo = uploadResult.arquivoId;
      }

      await audioBook.save({ transaction });
      await transaction.commit();

      return {
        code: 200,
        data: audioBook,
        message: "Audiobook atualizado com sucesso",
        success: true
      };

    } catch (error) {
      await transaction.rollback();
      console.error(error);
      return {
        code: 500,
        message: "Erro ao atualizar audiobook",
        success: false
      };
    }
  }
};

module.exports = AudioBookUpdateService;