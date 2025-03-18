const Ebook = require("../../models/Ebook");
const Book = require("../../models/Book");
const Arquivo = require("../../models/Arquivos");
const uploadDeleteService = require("../../services/uploadServices/uploadDeleteService");
const sequelize = require("../../database/config");

const EbookDeleteService = {
    delete: async (id) => {
        const transaction = await sequelize.transaction();

        try {
            // Busca o audiobook pelo ID
            const ebook = await Ebook.findByPk(id, { transaction });
            if (!ebook) {
                await transaction.rollback();
                return {
                    code: 404,
                    error: {
                        details: [
                            {
                                message: "Ebook não encontrado.",
                            },
                        ],
                    },
                    message: "Erro ao buscar Ebooko por ID",
                    success: false,
                };
            }

            // Busca o livro associado ao audiobook
            const book = await Book.findOne({
                where: {
                    id_ebook: id,
                },
                transaction,
            });

            if (book) {
                // Atualiza o livro, removendo a referência ao audiobook
                await book.update(
                    { id_ebook: null },
                    { transaction }
                );
            }

            // Deleta o arquivo do cloud e o registro no banco de dados
            if (ebook.id_arquivo) {
                const arquivo = await Arquivo.findByPk(ebook.id_arquivo, { transaction });
                if (arquivo) {
                    // Deleta o arquivo do cloud
                    const deleteFileResult = await uploadDeleteService.delete(arquivo.id);
                    if (!deleteFileResult.success) {
                        await transaction.rollback();
                        return {
                            code: deleteFileResult.code,
                            error: {
                                details: [
                                    {
                                        message: deleteFileResult.message,
                                    },
                                ],
                            },
                            message: "Erro ao deletar arquivo do cloud",
                            success: false,
                        };
                    }

                    // Deleta o registro do arquivo no banco de dados
                    await arquivo.destroy({ transaction });
                }
            }

            // Deleta o audiobook
            await ebook.destroy({ transaction });

            // Deleta a pasta do audiobook no sistema de arquivos (se necessário)
            if (book) {
                const nomeLivro = book.titulo.replace(/\s+/g, "_");
                const folderPath = `/${nomeLivro}/ebook`;

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
                        message: "Erro ao deletar pasta do ebook",
                        success: false,
                    };
                }
            }

            // Commit da transação
            await transaction.commit();

            return {
                code: 200,
                ebook,
                message: "Ebook, arquivo do cloud e registros associados deletados com sucesso!",
                success: true,
            };

        } catch (error) {
            await transaction.rollback();
            console.error(error);
            return {
                code: 500,
                error: {
                    details: [
                        {
                            message: error.message,
                        },
                    ],
                },
                message: "Erro ao deletar o Eook",
                success: false,
            };
        }
    },
};

module.exports = EbookDeleteService;