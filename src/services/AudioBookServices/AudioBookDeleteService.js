const AudioBook = require("../../models/Audiobook");
const Arquivos = require("../../models/Arquivos");
const uploadDeleteService = require("../../services/uploadServices/uploadDeleteService");
const sequelize = require("../../database/config");

const AudioBookDeleteService = {
  delete: async (id) => {
    const transaction = await sequelize.transaction();
    try {
      const audiobook = await AudioBook.findByPk(id, { transaction });
      
      if (!audiobook) {
        await transaction.rollback();
        return {
          code: 404,
          message: "Audiobook não encontrado",
          success: false
        };
      }

      if (audiobook.id_arquivo) {
        const arquivo = await Arquivos.findByPk(audiobook.id_arquivo, { transaction });
        if (arquivo) {
          await uploadDeleteService.delete(arquivo.id);
          await arquivo.destroy({ transaction });
        }
      }

      await audiobook.destroy({ transaction });
      await transaction.commit();

      return {
        code: 200,
        message: "Audiobook deletado com sucesso",
        success: true
      };
    } catch (error) {
      await transaction.rollback();
      console.error(error);
      return {
        code: 500,
        message: "Erro ao deletar audiobook",
        success: false,
        error: error.message
      };
    }
  }
};

module.exports = AudioBookDeleteService;