const AudioBook = require("../../models/Audiobook");
const Arquivos = require("../../models/Arquivos");
const uploadDeleteService = require("../../services/uploadServices/uploadDeleteService");
const sequelize = require("../../database/config");

const AudioBookDeleteByBookService = {
  deleteByBookId: async (idLivro) => {
    const transaction = await sequelize.transaction();
    try {
      const audiobooks = await AudioBook.findAll({
        where: { id_livro: idLivro },
        transaction
      });

      if (audiobooks.length === 0) {
        await transaction.rollback();
        return {
          code: 404,
          message: "Nenhum audiobook encontrado para este livro",
          success: false
        };
      }

      await Promise.all(audiobooks.map(async (audiobook) => {
        if (audiobook.id_arquivo) {
          const arquivo = await Arquivos.findByPk(audiobook.id_arquivo, { transaction });
          if (arquivo) {
            await uploadDeleteService.delete(arquivo.id);
            await arquivo.destroy({ transaction });
          }
        }
        return audiobook.destroy({ transaction });
      }));

      await transaction.commit();

      return {
        code: 200,
        message: "Todos os audiobooks do livro foram deletados com sucesso",
        success: true
      };
    } catch (error) {
      await transaction.rollback();
      console.error(error);
      return {
        code: 500,
        message: "Erro ao deletar audiobooks do livro",
        success: false,
        error: error.message
      };
    }
  }
};

module.exports = AudioBookDeleteByBookService;