const Book = require("../../models/Book");
const Capa = require("../../models/Capa");
const Banner = require("../../models/Banner");
const Arquivos = require("../../models/Arquivos");
const AudioBook = require("../../models/Audiobook");
const Ebook = require("../../models/Ebook");

const BookGetByIdService = async (id) => {
  try {
    const book = await Book.findByPk(id, {
      include: [
        {
          model: Capa,
          as: "capa",
          include: [{ model: Arquivos, as: "arquivo" }]
        },
        {
          model: Banner,
          as: "banner",
          include: [{ model: Arquivos, as: "arquivo" }]
        },
        {
          model: Ebook,
          as: 'ebook', // Usando o singular
          include: [{ model: Arquivos, as: 'arquivo' }]
        },
        {
          model: AudioBook,
          as: "audiobook", // Mantendo no singular
          include: [{ model: Arquivos, as: "arquivo" }]
        }
      ],
    });

    if (!book) {
      return {
        code: 404,
        error: { details: [{ message: "Livro não encontrado." }] },
        message: "Livro não encontrado",
        success: false,
      };
    }

    return {
      code: 200,
      data: book,
      message: "Livro encontrado com sucesso",
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      code: 500,
      error: { details: [{ service: "BookGetByIdService", message: error.message }] },
      message: "Erro ao buscar livro por ID",
      success: false,
    };
  }
};

module.exports = BookGetByIdService;