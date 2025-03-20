const Ebook = require("../../models/Ebook");
const sequelize = require("../../database/config");
const uploadCreateService = require("../uploadServices/uploadCreateService");

const EbookCreateService = {
    create: async (nomeLivro, publicacao, files) => {
        const transaction = await sequelize.transaction();

        try {

            if (!files || !files.Ebook || files.Ebook.length === 0) {
                await transaction.rollback();
                return {
                    code: 400,
                    error: "Nenhum arquivo de pdfenviado.",
                    success: false,
                };
            }

            const { originalname, buffer, mimetype } = files.Ebook[0];

            const uploadResult = await uploadCreateService.create(
                originalname,
                buffer,
                mimetype,
                "ebook",
                nomeLivro
            );

            if (!uploadResult.success) {
                await transaction.rollback();
                return uploadResult;
            }

            const ebookData = {
                id_arquivo: uploadResult.arquivoId,
                publicacao: publicacao
            };

            const createdEbook = await Ebook.create(ebookData, { transaction });
            await transaction.commit();

            return {
                code: 201,
                ebooks: createdEbook,
                message: "Ebook criado com sucesso",
                success: true,
            };

        } catch (error) {

            await transaction.rollback();
            console.error(error);
            return {
                code: 500,
                error: "Erro ao criar o ebook",
                success: false,
            };
        }
    }
}

module.exports = EbookCreateService;