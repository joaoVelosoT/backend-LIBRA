const AudioBook = require("../../models/AudioBook");
const sequelize = require("../../database/config");
const uploadCreateService = require("../uploadServices/uploadCreateService");


const AudioBookCreateService = {
    create: async (nomeLivro, publicacao, file) => {
        const transaction = await sequelize.transaction();

        try {

            const audiobookData = {
                id_arquivo: null,
                publicacao: publicacao
            }

            const AudioBooks = await AudioBook.create(audiobookData, { transaction });

            if (file.audioBook) {
                const { originalname, buffer, mimetype } = file.audioBook[0];

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

                AudioBooks.id_arquivo = uploadResult.arquivoId
                await AudioBooks.save({ transaction });
            }

            await transaction.commit();

            return {
                code: 201,
                AudioBooks,
                message: "Audiobook criado com sucesso",
                success: true,
            };

        } catch (error) {
            await transaction.rollback();
            console.error(error);
            throw new Error(error.message);
        }
    }
}

module.exports = AudioBookCreateService;