const Book = require("../../models/Book");
const Banner = require("../../models/Banner");
const Capa = require("../../models/Capa");
const Arquivos = require("../../models/Arquivos");
const sequelize = require("../../database/config");
const uploadCreateService = require("../uploadServices/uploadCreateService");
const { Storage } = require('@google-cloud/storage');
const storage = new Storage();
const bucketName = process.env.GCS_BUCKET_NAME;

// Função auxiliar para mover arquivos no GCS
const moveFileInGCS = async (oldPath, newPath) => {
  try {
    const fileAntigo = storage.bucket(bucketName).file(oldPath);
    const fileNovo = storage.bucket(bucketName).file(newPath);

    // Verifica se o arquivo antigo existe
    const [exists] = await fileAntigo.exists();
    if (exists) {
      await fileAntigo.move(fileNovo); // Move o arquivo para o novo caminho
      return true;
    }
    return false;
  } catch (error) {
    console.error("Erro ao mover arquivo no GCS:", error);
    throw error;
  }
};

const BookUpdateService = async (id, bookData, files) => {
  const transaction = await sequelize.transaction();

  try {
    const book = await Book.findByPk(id, { transaction });

    if (!book) {
      await transaction.rollback();
      return {
        code: 404,
        message: "Livro não encontrado",
        success: false,
      };
    }

    // Verifica se o nome do livro foi alterado
    const nomeLivroAntigo = book.titulo.replace(/\s+/g, "_");
    const nomeLivroNovo = bookData.titulo ? bookData.titulo.replace(/\s+/g, "_") : nomeLivroAntigo;

    // Se generos foram fornecidos, atualiza
if (bookData.generos !== undefined) {
  if (!Array.isArray(bookData.generos)) {
    await transaction.rollback();
    return {
      code: 400,
      message: "Gêneros devem ser um array",
      success: false,
    };
  }
  book.generos = bookData.generos;
}

    // Atualiza os campos do livro
    if (bookData) {
      await book.update(bookData, { transaction });
    }

    // Se o nome do livro foi alterado, move todos os arquivos para a nova pasta
    if (nomeLivroNovo !== nomeLivroAntigo) {
      // Move o banner (se existir)
      if (book.id_banner) {
        const banner = await Banner.findByPk(book.id_banner, { transaction });
        if (banner) {
          const arquivoBanner = await Arquivos.findByPk(banner.id_link, { transaction });
          if (arquivoBanner) {
            const oldPathBanner = arquivoBanner.url.replace(`https://storage.googleapis.com/${bucketName}/`, '');
            const newPathBanner = `${nomeLivroNovo}/banner/${arquivoBanner.nome}`;

            await moveFileInGCS(oldPathBanner, newPathBanner);

            // Atualiza o caminho no banco de dados
            await arquivoBanner.update(
              {
                url: `https://storage.googleapis.com/${bucketName}/${newPathBanner}`,
              },
              { transaction }
            );
          }
        }
      }

      // Move a capa (se existir)
      if (book.id_capa) {
        const capa = await Capa.findByPk(book.id_capa, { transaction });
        if (capa) {
          const arquivoCapa = await Arquivos.findByPk(capa.id_link, { transaction });
          if (arquivoCapa) {
            const oldPathCapa = arquivoCapa.url.replace(`https://storage.googleapis.com/${bucketName}/`, '');
            const newPathCapa = `${nomeLivroNovo}/capa/${arquivoCapa.nome}`;

            await moveFileInGCS(oldPathCapa, newPathCapa);

            // Atualiza o caminho no banco de dados
            await arquivoCapa.update(
              {
                url: `https://storage.googleapis.com/${bucketName}/${newPathCapa}`,
              },
              { transaction }
            );
          }
        }
      }
    }

    // Atualiza o banner se fornecido
    if (files?.banner) {
      const { originalname, buffer, mimetype } = files.banner[0];

      if (book.id_banner) {
        // Consulta o banner associado ao livro
        const banner = await Banner.findByPk(book.id_banner, { transaction });

        if (banner) {
          // Consulta o arquivo associado ao banner
          const arquivo = await Arquivos.findByPk(banner.id_link, { transaction });

          if (arquivo) {
            // Extrai o caminho do arquivo no GCS a partir da URL
            const url = arquivo.url;
            const filePathAntigo = url.replace(`https://storage.googleapis.com/${bucketName}/`, '');

            // Define o novo caminho do arquivo no GCS
            const filePathNovo = `${nomeLivroNovo}/banner/${originalname}`;

            // Move o arquivo no GCS para o novo caminho
            await moveFileInGCS(filePathAntigo, filePathNovo);

            // Atualiza o registro na tabela Arquivos com o novo caminho
            await arquivo.update(
              {
                nome: originalname,
                url: `https://storage.googleapis.com/${bucketName}/${filePathNovo}`,
                tipo: mimetype,
              },
              { transaction }
            );
          }
        }
      } else {
        // Cria um novo banner se não existir
        const uploadResult = await uploadCreateService.create(
          originalname,
          buffer,
          mimetype,
          "banner",
          nomeLivroNovo
        );

        if (!uploadResult.success) {
          await transaction.rollback();
          return uploadResult;
        }

        // Cria um novo registro na tabela Arquivos
        const arquivo = await Arquivos.create(
          {
            nome: originalname,
            url: `https://storage.googleapis.com/${bucketName}/${nomeLivroNovo}/banner/${originalname}`,
            tipo: mimetype,
          },
          { transaction }
        );

        // Cria um novo registro na tabela Banner
        const banner = await Banner.create(
          {
            id_link: arquivo.id,
          },
          { transaction }
        );

        // Associa o novo banner ao livro
        book.id_banner = banner.id;
        await book.save({ transaction });
      }
    }

    // Atualiza a capa se fornecida
    if (files?.capa) {
      const { originalname, buffer, mimetype } = files.capa[0];

      if (book.id_capa) {
        // Consulta a capa associada ao livro
        const capa = await Capa.findByPk(book.id_capa, { transaction });

        if (capa) {
          // Consulta o arquivo associado à capa
          const arquivo = await Arquivos.findByPk(capa.id_link, { transaction });

          if (arquivo) {
            // Extrai o caminho do arquivo no GCS a partir da URL
            const url = arquivo.url;
            const filePathAntigo = url.replace(`https://storage.googleapis.com/${bucketName}/`, '');

            // Define o novo caminho do arquivo no GCS
            const filePathNovo = `${nomeLivroNovo}/capa/${originalname}`;

            // Move o arquivo no GCS para o novo caminho
            await moveFileInGCS(filePathAntigo, filePathNovo);

            // Atualiza o registro na tabela Arquivos com o novo caminho
            await arquivo.update(
              {
                nome: originalname,
                url: `https://storage.googleapis.com/${bucketName}/${filePathNovo}`,
                tipo: mimetype,
              },
              { transaction }
            );
          }
        }
      } else {
        // Cria uma nova capa se não existir
        const uploadResult = await uploadCreateService.create(
          originalname,
          buffer,
          mimetype,
          "capa",
          nomeLivroNovo
        );

        if (!uploadResult.success) {
          await transaction.rollback();
          return uploadResult;
        }

        // Cria um novo registro na tabela Arquivos
        const arquivo = await Arquivos.create(
          {
            nome: originalname,
            url: `https://storage.googleapis.com/${bucketName}/${nomeLivroNovo}/capa/${originalname}`,
            tipo: mimetype,
          },
          { transaction }
        );

        // Cria um novo registro na tabela Capa
        const capa = await Capa.create(
          {
            id_link: arquivo.id,
          },
          { transaction }
        );

        // Associa a nova capa ao livro
        book.id_capa = capa.id;
        await book.save({ transaction });
      }
    }

    await transaction.commit();

    return {
      code: 200,
      book,
      message: "Livro atualizado com sucesso",
      success: true,
    };
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    throw new Error(error.message);
  }
};

module.exports = BookUpdateService;