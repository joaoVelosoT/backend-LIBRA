const Book = require("../../models/Book");
const Capa = require("../../models/Capa");
const Banner = require("../../models/Banner");
const sequelize = require("../../database/config");
const uploadCreateService = require("../uploadServices/uploadCreateService");


const BookCreateService = async (bookData, files) => {
  const transaction = await sequelize.transaction();

  try {
    const book = await Book.create(bookData, { transaction });
    const nomeLivro = book.titulo.replace(/\s+/g, "_");

    console.log(nomeLivro);


    if (files.capa) {
      const { originalname, buffer, mimetype } = files.capa[0];

      const uploadResult = await uploadCreateService.create(
        originalname,
        buffer,
        mimetype,
        "capa",
        nomeLivro
      );

      if (!uploadResult.success) {
        await transaction.rollback();
        return uploadResult;
      }

      const capa = await Capa.create(
        {
          id_link: uploadResult.arquivoId,
        },
        { transaction }
      );

      book.id_capa = capa.id;
      await book.save({ transaction });
    }

    if (files.banner) {
      const { originalname, buffer, mimetype } = files.banner[0];

      const uploadResult = await uploadCreateService.create(
        originalname,
        buffer,
        mimetype,
        "banner",
        nomeLivro
      );

      if (!uploadResult.success) {
        await transaction.rollback();
        return uploadResult;
      }

      const banner = await Banner.create(
        {
          id_link: uploadResult.arquivoId,
        },
        { transaction }
      );

      book.id_banner = banner.id;
      await book.save({ transaction });
    }

    await transaction.commit();

    return {
      code: 201,
      book,
      message: "Livro criado com sucesso",
      success: true,
    };
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    throw new Error(error.message);
  }
};

module.exports = BookCreateService;