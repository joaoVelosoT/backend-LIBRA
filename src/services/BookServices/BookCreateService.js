const Book = require("../../models/Book");
const Arquivos = require("../../models/Arquivos");
const Capa = require("../../models/Capa");
const Banner = require("../../models/Banner");
const sequelize = require("../../database/config");
const uploadCreateService = require("../uploadServices/uploadCreateService");

const BookCreateService = async (bookData, files) => {
  const transaction = await sequelize.transaction();

  try {
    // 1. Criar o livro no banco de dados
    const book = await Book.create(bookData, { transaction });

    // Normaliza o nome do livro para usar como nome da pasta
    const nomeLivro = book.titulo.replace(/\s+/g, "_");

    // 2. Upload da capa e salvar na tabela Arquivos
    if (files.capa) {
      const { originalname, buffer, mimetype } = files.capa[0];

      // Usar o serviço de upload para fazer o upload da capa
      const uploadResult = await uploadCreateService.create(
        originalname,
        buffer,
        mimetype,
        "capa", // Tipo de arquivo: capa
        nomeLivro // Nome do livro (nome da pasta)
      );

      if (!uploadResult.success) {
        await transaction.rollback();
        return uploadResult; // Retorna o erro do upload
      }

      const capaUrl = uploadResult.fileUrl;

      // Salvar a capa na tabela Arquivos
      const arquivoCapa = await Arquivos.create(
        {
          nome: originalname,
          url: capaUrl,
          tipo: mimetype,
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

    // 3. Upload do banner e salvar na tabela Arquivos
    if (files.banner) {
      const { originalname, buffer, mimetype } = files.banner[0];

      // Usar o serviço de upload para fazer o upload do banner
      const uploadResult = await uploadCreateService.create(
        originalname,
        buffer,
        mimetype,
        "banner", // Tipo de arquivo: banner
        nomeLivro // Nome do livro (nome da pasta)
      );

      if (!uploadResult.success) {
        await transaction.rollback();
        return uploadResult; // Retorna o erro do upload
      }

      const bannerUrl = uploadResult.fileUrl;

      // Salvar o banner na tabela Arquivos
      const arquivoBanner = await Arquivos.create(
        {
          nome: originalname,
          url: bannerUrl,
          tipo: mimetype,
        },
        { transaction }
      );

      // Criar o banner na tabela Banner
      const banner = await Banner.create(
        {
          id_link: arquivoBanner.id,
        },
        { transaction }
      );

      // Atualizar o livro com o ID do banner
      book.id_banner = banner.id;
      await book.save({ transaction });
    }

    // 4. Confirmar a transação
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