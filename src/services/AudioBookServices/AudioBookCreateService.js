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

            const { originalname, buffer, mimetype } = files.audioBook[0];

            const uploadResult = await uploadCreateService.create(
                originalname,
                buffer,
                mimetype,
                "audioBook",
                nomeLivro
            );

            if (!uploadResult.success) {
                await transaction.rollback();
                return uploadResult;
            }

            const audiobookData = {
                id_arquivo: uploadResult.arquivoId,
                publicacao: publicacao
            };

            const createdAudioBook = await AudioBook.create(audiobookData, { transaction });
            await transaction.commit();

            return {
                code: 201,
                AudioBooks: createdAudioBook,
                message: "Audiobook criado com sucesso",
                success: true,
            };

        } catch (error) {
            await transaction.rollback();
            console.error(error);
            return {
                code: 500,
                error: "Erro ao criar o audiobook",
                success: false,
            };
        }
    }
};

module.exports = AudioBookCreateService;