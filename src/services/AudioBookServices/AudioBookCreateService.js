// services/AudioBookServices/AudioBookCreateService.js
const AudioBook = require("../../models/AudioBook");
const Book = require("../../models/Book");
const sequelize = require("../../database/config");
const uploadCreateService = require("../uploadServices/uploadCreateService");

const AudioBookCreateService = {
  create: async (nomeLivro, audioBookData, files) => {
    const transaction = await sequelize.transaction();
    try {
      const { idLivro, publicacao } = audioBookData;
      
      // Verifica se o livro existe
      const book = await Book.findByPk(idLivro, { transaction });
      if (!book) {
        await transaction.rollback();
        return {
          code: 404,
          message: "Livro não encontrado",
          success: false
        };
      }

      // Processa todos os arquivos de áudio
      const createdAudioBooks = await Promise.all(
        files.audioBook.map(async (file) => {
          const { originalname, buffer, mimetype } = file;

          const uploadResult = await uploadCreateService.create(
            originalname,
            buffer,
            mimetype,
            "audioBook",
            nomeLivro
          );

          if (!uploadResult.success) {
            throw new Error(uploadResult.message);
          }

          return await AudioBook.create({
            id_arquivo: uploadResult.arquivoId,
            id_livro: idLivro,
            publicacao
          }, { transaction });
        })
      );

      await transaction.commit();
      
      return {
        code: 201,
        data: createdAudioBooks,
        message: "Audiobooks criados com sucesso",
        success: true
      };

    } catch (error) {
      await transaction.rollback();
      console.error(error);
      return {
        code: 500,
        message: error.message || "Erro ao criar audiobooks",
        success: false
      };
    }
  }
};

module.exports = AudioBookCreateService;