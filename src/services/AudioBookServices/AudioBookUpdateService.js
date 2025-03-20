const AudioBook = require("../../models/AudioBook");
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

const AudioBookUpdateService = async (id, files) => {
    const transaction = await sequelize.transaction();

    try {
        const audioBook = await AudioBook.findByPk(id, { transaction });

        if (!audioBook) {
            await transaction.rollback();
            return {
                code: 404,
                message: "AudioBook não encontrado",
                success: false,
            };
        }

        const book = await Book.findOne({
            where: {
                id_audiobook: audioBook.dataValues.id,
            },
        });

        if (!book) {
            await transaction.rollback();
            return {
                code: 404,
                message: "Livro associado ao AudioBook não encontrado",
                success: false,
            };
        }

        const bookName = book.dataValues.titulo.replace(/\s+/g, "_");

        // Verifica se o arquivo foi enviado
        if (files?.audiobook?.[0]) {
            const { originalname, buffer, mimetype } = files.audiobook[0];

            if (audioBook.id_arquivo) {
                // Consulta o arquivo associado ao AudioBook
                const arquivo = await Arquivos.findByPk(audioBook.id_arquivo, { transaction });

                if (arquivo) {
                    // Extrai o caminho do arquivo no GCS a partir da URL
                    const url = arquivo.url;
                    const filePathAntigo = url.replace(`https://storage.googleapis.com/${bucketName}/`, '');

                    // Define o novo caminho do arquivo no GCS
                    const filePathNovo = `${bookName}/audioBook/${originalname}`;

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
                    "audiobook",
                    `${bookName}/audioBook`
                );

                if (!uploadResult.success) {
                    await transaction.rollback();
                    return uploadResult;
                }

                // Cria um novo registro na tabela Arquivos
                const arquivo = await Arquivos.create(
                    {
                        nome: originalname,
                        url: `https://storage.googleapis.com/${bucketName}/${bookName}/audioBook/${originalname}`,
                        tipo: mimetype,
                    },
                    { transaction }
                );

                // Associa o novo arquivo ao AudioBook
                audioBook.id_arquivo = arquivo.id;
                await audioBook.save({ transaction });
            }
        }

        await transaction.commit();

        return {
            code: 200,
            audioBook,
            message: "AudioBook atualizado com sucesso",
            success: true,
        };
    } catch (error) {
        await transaction.rollback();
        console.error(error);
        return {
            code: 500,
            message: "Erro ao atualizar o AudioBook",
            success: false,
        };
    }
};

module.exports = AudioBookUpdateService;