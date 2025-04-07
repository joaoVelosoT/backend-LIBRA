const AudioBook = require("../../models/Audiobook");
const Arquivos = require("../../models/Arquivos");

const AudioBookGetByBookService = {
  getByBookId: async (idLivro) => {
    try {
      const audiobooks = await AudioBook.findAll({
        where: { id_livro: idLivro },
        include: [{
          model: Arquivos,
          as: 'arquivo'
        }],
        order: [['createdAt', 'ASC']]
      });

      if (audiobooks.length === 0) {
        return {
          code: 404,
          message: "Nenhum audiobook encontrado para este livro",
          success: false
        };
      }

      return {
        code: 200,
        data: audiobooks,
        message: "Audiobooks encontrados com sucesso",
        success: true
      };
    } catch (error) {
      console.error(error);
      return {
        code: 500,
        message: "Erro ao buscar audiobooks",
        success: false,
        error: error.message
      };
    }
  }
};

module.exports = AudioBookGetByBookService;