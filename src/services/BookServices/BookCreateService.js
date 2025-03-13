const Book = require("../../models/Book");
const Arquivos = require("../../models/Arquivos");
const { Storage } = require("@google-cloud/storage");
const Capa = require("../../models/Capa"); 
const Banner = require("../../models/Banner"); 
const path = require("path");
const sequelize = require("../../database/config");

const storage = new Storage({
  keyFilename: path.join(__dirname, "../../database/libra-453101-6caaf8b9ebee.json"),
});
const bucketName = "libra_tcc";
const bucket = storage.bucket(bucketName);

const BookCreateService = async (bookData, files) => {
  const transaction = await sequelize.transaction();

  try {
    const book = await Book.create(bookData, { transaction });

    // Upload da capa e salvar na tabela Arquivos
    if (files.capa) {
      const capaFileName = `capa_${Date.now()}_${files.capa[0].originalname}`;
      const capaFile = bucket.file(`livros/${book.titulo.replace(/\s+/g, "_")}_${book.id}/${capaFileName}`);
      await capaFile.save(files.capa[0].buffer, {
        metadata: { contentType: files.capa[0].mimetype },
      });
      await capaFile.makePublic();

      const capaUrl = `https://storage.googleapis.com/${bucketName}/livros/${book.titulo.replace(/\s+/g, "_")}_${book.id}/${capaFileName}`;

      // Salvar a capa na tabela Arquivos
      const arquivoCapa = await Arquivos.create(
        {
          nome: capaFileName,
          url: capaUrl,
          tipo: files.capa[0].mimetype,
        },
        { transaction }
      );

      // Criar a capa na tabela Capa
      const capa = await Capa.create(
        {
          id_link: arquivoCapa.id, 
        },
        { transaction }
      );

      // Atualizar o livro com o ID da capa
      book.id_capa = capa.id; 
      await book.save({ transaction });
    }

    //Upload do banner e salvar na tabela Arquivos
    if (files.banner) {
      const bannerFileName = `banner_${Date.now()}_${files.banner[0].originalname}`;
      const bannerFile = bucket.file(`livros/${book.titulo.replace(/\s+/g, "_")}_${book.id}/${bannerFileName}`);
      await bannerFile.save(files.banner[0].buffer, {
        metadata: { contentType: files.banner[0].mimetype },
      });
      await bannerFile.makePublic();
      const bannerUrl = `https://storage.googleapis.com/${bucketName}/livros/${book.titulo.replace(/\s+/g, "_")}_${book.id}/${bannerFileName}`;
      const arquivoBanner = await Arquivos.create(
        {
          nome: bannerFileName,
          url: bannerUrl,
          tipo: files.banner[0].mimetype,
        },
        { transaction }
      );
      const banner = await Banner.create(
        {
          id_link: arquivoBanner.id, 
        },
        { transaction }
      );

      banner.id_banner = banner.id; 
      await banner.save({ transaction });
    }

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