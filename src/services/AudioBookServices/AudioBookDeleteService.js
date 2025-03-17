const AudioBook = require("../../models/Audiobook");
const Book = require("../../models/Book");
const Arquivo = require("../../models/Arquivos");
const uploadDeleteService = require("../../services/uploadServices/uploadDeleteService");
const sequelize = require("../../database/config");

const normalizeFileName = (fileName) => {
    return fileName.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // Remove acentos
};

const AudioBookDeleteService = {
    delete: async (id) => {

        const transaction = await sequelize.transaction();

        try {
            const audiobook = await AudioBook.findByPk(id, { transaction });
            if (!audiobook) {
                await transaction.rollback();
                return {
                    code: 404,
                    error: {
                        details: [
                            {
                                message: "AudioBook não encontrado.",
                            },
                        ],
                    },
                    message: "Erro ao buscar AudioBook por ID",
                    success: false,
                };
            };

            const book = await Book.findOne({
                where: {
                    id_AudioBook: id
                },
            });

            if (!book) {
                await transaction.rollback();
                return {
                    code: 404,
                    error: {
                        details: [
                            {
                                message: "Book não encontrado.",
                            },
                        ],
                    },
                    message: "Erro ao buscar Book por ID",
                    success: false,
                };
            }


            await book.update(
                { id_Audiobook: null },
                { where: { id_Audiobook: id }, transaction }
            );

            const normalizedFileName = normalizeFileName(book.titulo);

            const folderPath = `/${normalizedFileName}/audioBook`;

            const deleteFolderResult = await uploadDeleteService.deleteFolder(folderPath);

            if (!deleteFolderResult.success) {
                await transaction.rollback();
                return {
                    code: deleteFolderResult.code,
                    error: {
                        details: [
                            {
                                message: deleteFolderResult.message,
                            },
                        ],
                    },
                    message: "Erro ao deletar pasta do audioBook",
                    success: false,
                };
            };

            if (audiobook.id_arquivo) {
                const arquivo = await Arquivo.findByPk(audiobook.id_arquivo, { transaction });
                await arquivo.destroy({ transaction });
            }

            await audiobook.destroy({ transaction });
            await transaction.commit();

            return {
                code: 200,
                audiobook,
                message: "Audiobook e todos os arquivos associados deletados com sucesso!",
                success: true,
            };


        } catch (error) {
            await transaction.rollback();
            console.error(error);
            throw new Error(error.message);
        }
    }
}

module.exports = AudioBookDeleteService;