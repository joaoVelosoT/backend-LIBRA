const Book = require("../../models/Book");
const Capa = require("../../models/Capa");
const Banner = require("../../models/Banner");
const EBook = require("../../models/EBook");
const AudioBook = require("../../models/AudioBook");
const Arquivos = require("../../models/Arquivos");

const BookGetByIdService = async (id) => {
  try {
    const book = await Book.findByPk(id, {
      include: [
        {
          model: Capa,
          as: "capa",
          include: [
            {
              model: Arquivos,
              as: "arquivo",
            },
          ],
        },
        {
          model: Banner,
          as: "banner",
          include: [
            {
              model: Arquivos,
              as: "arquivo",
            },
          ],
        },
        {
          model: EBook,
          as: "ebook",
          include: [
            {
              model: Arquivos,
              as: "arquivo",
            },
          ],
        },
        {
          model: AudioBook,
          as: "audiobook",
          include: [
            {
              model: Arquivos,
              as: "arquivo",
            },
          ],
        },
      ],
    });

    if (!book) {
      return {
        code: 404,
        error: {
          details: [
            {
              message: "Livro não encontrado.",
            },
          ],
        },
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
      error: {
        details: [
          {
            service: "BookGetByIdService",
            message: error.message,
          },
        ],
      },
      message: "Erro ao buscar livro por ID",
      success: false,
    };
  }
};

module.exports = BookGetByIdService;