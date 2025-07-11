const EBook = require("../../models/Ebook");
const Arquivos = require("../../models/Arquivos");
const Book = require("../../models/Book");
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

const EbookUpdateService = async (id, files) => {
    const transaction = await sequelize.transaction();

    try {
        const ebook = await EBook.findByPk(id, { transaction });

        if (!ebook) {
            await transaction.rollback();
            return {
                code: 404,
                message: "Ebook não encontrado",
                success: false,
            };
        }

        const book = await Book.findOne({
            where: {
                id_ebook: ebook.dataValues.id,
            },
        });

        if (!book) {
            await transaction.rollback();
            return {
                code: 404,
                message: "Livro associado ao Ebook não encontrado",
                success: false,
            };
        }

        const bookName = book.dataValues.titulo.replace(/\s+/g, "_");

        // Verifica se o arquivo foi enviado
        if (files?.Ebook?.[0]) {
            const { originalname, buffer, mimetype } = files.Ebook[0];

            if (ebook.id_arquivo) {
                // Consulta o arquivo associado ao Ebook
                const arquivo = await Arquivos.findByPk(ebook.id_arquivo, { transaction });

                if (arquivo) {
                    // Extrai o caminho do arquivo no GCS a partir da URL
                    const url = arquivo.url;
                    const filePathAntigo = url.replace(`https://storage.googleapis.com/${bucketName}/`, '');

                    // Define o novo caminho do arquivo no GCS
                    const filePathNovo = `${bookName}/ebook/${originalname}`;

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
            } else {
                // Cria um novo arquivo se não existir
                const uploadResult = await uploadCreateService.create(
                    originalname,
                    buffer,
                    mimetype,
                    "ebook",
                    `${bookName}/ebook`
                );

                if (!uploadResult.success) {
                    await transaction.rollback();
                    return uploadResult;
                }

                // Cria um novo registro na tabela Arquivos
                const arquivo = await Arquivos.create(
                    {
                        nome: originalname,
                        url: `https://storage.googleapis.com/${bucketName}/${bookName}/ebook/${originalname}`,
                        tipo: mimetype,
                    },
                    { transaction }
                );

                // Associa o novo arquivo ao Ebook
                ebook.id_arquivo = arquivo.id;
                await ebook.save({ transaction });
            }
        }

        await transaction.commit();

        return {
            code: 200,
            ebook,
            message: "Ebook atualizado com sucesso",
            success: true,
        };
    } catch (error) {
        await transaction.rollback();
        console.error(error);
        return {
            code: 500,
            message: "Erro ao atualizar o Ebook",
            success: false,
        };
    }
};

module.exports = EbookUpdateService;