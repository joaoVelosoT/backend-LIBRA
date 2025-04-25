const Book = require("../../models/Book");
const Capa = require("../../models/Capa");
const Banner = require("../../models/Banner");
const Arquivos = require("../../models/Arquivos");
const sequelize = require("../../database/config");
const uploadDeleteService = require("../uploadServices/uploadDeleteService");

const BookDeleteService = async (id) => {
  const transaction = await sequelize.transaction();

  try {
    const book = await Book.findByPk(id, { transaction });

    if (!book) {
      await transaction.rollback();
      return {
        code: 404,
        error: {
          details: [
            {
              message: "Livro não encontrado.",
            },
          ],
        },
        message: "Erro ao buscar livro por ID",
        success: false,
      };
    }

    const nomeLivro = book.titulo.replace(/\s+/g, "_");
    const folderPath = `${nomeLivro}`;
    const deleteFolderResult = await uploadDeleteService.deleteFolder(folderPath);

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
        message: "Erro ao deletar pasta do livro",
        success: false,
      };
    }
    if (book.id_capa) {
      const capa = await Capa.findByPk(book.id_capa, { transaction });
      if (capa) {
        const arquivoCapa = await Arquivos.findByPk(capa.id_link, { transaction });
        if (arquivoCapa && !arquivoCapa.existsOnCloud) {
          await arquivoCapa.destroy({ transaction });
        }
        await capa.destroy({ transaction });
      }
    }
    if (book.id_banner) {
      const banner = await Banner.findByPk(book.id_banner, { transaction });
      if (banner) {
        const arquivoBanner = await Arquivos.findByPk(banner.id_link, { transaction });
        if (arquivoBanner && !arquivoBanner.existsOnCloud) {
          await arquivoBanner.destroy({ transaction });
        }
        await banner.destroy({ transaction });
      }
    }

    await book.destroy({ transaction });
    await transaction.commit();

    return {
      code: 200,
      book,
      message: "Livro e todos os arquivos associados deletados com sucesso!",
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
      message: "Erro ao deletar livro",
      success: false,
    };
  }
};

module.exports = BookDeleteService;