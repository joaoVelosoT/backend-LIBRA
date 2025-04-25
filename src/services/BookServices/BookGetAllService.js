const Book = require("../../models/Book");
const Capa = require("../../models/Capa");
const Banner = require("../../models/Banner");
const Arquivos = require("../../models/Arquivos");
const AudioBook = require("../../models/Audiobook");
const Ebook = require("../../models/Ebook");

// services/BookServices/BookGetAllService.js
const BookGetAllService = async (query) => {
  try {
    const books = await Book.findAll({
      include: [
        {
          model: Capa,
          as: 'capa',
          include: [{ model: Arquivos, as: 'arquivo' }]
        },
        {
          model: Banner,
          as: 'banner',
          include: [{ model: Arquivos, as: 'arquivo' }]
        },
        {
          model: AudioBook,
          as: 'audiobook', // Usando o singular
          include: [{ model: Arquivos, as: 'arquivo' }]
        },
        {
          model: Ebook,
          as: 'ebook', // Usando o singular
          include: [{ model: Arquivos, as: 'arquivo' }]
        }
      ],
    });

    if (books.length === 0) {
      return {
        code: 200,
        data: [],
        message: "Nenhum livro encontrado",
        success: true,
      };
    }
    return {
      code: 200,
      data: books,
      message: "Todos os livros encontrados",
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      code: 500,
      error: { details: [{ service: "BookGetAllService", message: error.message }] },
      message: "Erro ao buscar livros",
      success: false,
    };
  }
};

module.exports = BookGetAllService;