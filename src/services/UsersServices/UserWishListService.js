const User = require("../../models/User");
const Book = require("../../models/Book");
const sequelize = require("../../database/config");

const UserDesejoLeituraService = {
    addBookWishList: async (userId, bookId) => {
        const transaction = await sequelize.transaction();
        try {
            // Busca o livro pelo ID
            const livro = await Book.findByPk(bookId, { transaction });

            if (!livro) {
                await transaction.rollback();
                return {
                    code: 404,
                    message: "Livro não encontrado",
                    success: false,
                };
            }

            const user = await User.findByPk(userId, { transaction });

            if (!user) {
                await transaction.rollback();
                return {
                    code: 404,
                    message: "Usuário não encontrado",
                    success: false,
                };
            }

            const desejoLeitura = user.desejoLeitura ? [...user.desejoLeitura] : [];
            const desejoLeituraIds = user.desejoLeituraIds ? [...user.desejoLeituraIds] : [];

            if (desejoLeituraIds.includes(livro.id)) {
                await transaction.rollback();
                return {
                    code: 400,
                    message: "Livro já está na lista de desejo de leitura",
                    success: false,
                };
            }

            desejoLeitura.push(livro);
            desejoLeituraIds.push(livro.id);

            await user.update({ desejoLeitura, desejoLeituraIds }, { transaction });
            await transaction.commit();

            return {
                code: 200,
                message: "Livro adicionado à lista de desejo de leitura com sucesso",
                success: true,
                data: {
                    userId,
                    livroId: livro.id,
                    desejoLeituraCount: desejoLeitura.length
                }
            };
        } catch (error) {
            await transaction.rollback();
            console.error("Erro no UserDesejoLeituraService (addBookWishList):", error);
            return {
                code: 500,
                message: "Erro ao adicionar livro ao desejo de leitura",
                success: false,
                error: error.message,
            };
        }
    }
};

module.exports = UserDesejoLeituraService;
