const AudioBook = require("../../models/AudioBook");
const sequelize = require("../../database/config");
const uploadCreateService = require("../uploadServices/uploadCreateService");

const AudioBookCreateService = {
    create: async (nomeLivro, publicacao, files) => {
        const transaction = await sequelize.transaction();

        try {
            if (!files || !files.audioBook || files.audioBook.length === 0) {
                await transaction.rollback();
                return {
                    code: 400,
                    error: "Nenhum arquivo de áudio enviado.",
                    success: false,
                };
            }

            // Processar todos os arquivos de áudio
            const uploadPromises = files.audioBook.map(async (file) => {
                const { originalname, buffer, mimetype } = file;

                const uploadResult = await uploadCreateService.create(
                    originalname,
                    buffer,
                    mimetype,
                    "audioBook",
                    nomeLivro
                );

                if (!uploadResult.success) {
                    throw new Error(uploadResult.message);
                }

                return uploadResult.arquivoId;
            });

            // Esperar todos os uploads serem concluídos
            const arquivosIds = await Promise.all(uploadPromises);

            // Criar um audiobook para cada arquivo (ou associar todos ao mesmo audiobook, dependendo da sua lógica)
            const createdAudioBooks = await Promise.all(
                arquivosIds.map(async (arquivoId) => {
                    const audiobookData = {
                        id_arquivo: arquivoId,
                        publicacao: publicacao
                    };
                    return await AudioBook.create(audiobookData, { transaction });
                })
            );

            await transaction.commit();

            return {
                code: 201,
                AudioBooks: createdAudioBooks,
                message: "Audiobooks criados com sucesso",
                success: true,
            };

        } catch (error) {
            await transaction.rollback();
            console.error(error);
            return {
                code: 500,
                error: error.message || "Erro ao criar o audiobook",
                success: false,
            };
        }
    }
};

module.exports = AudioBookCreateService;