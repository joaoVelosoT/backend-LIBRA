const User = require("../../models/User");
const Book = require("../../models/Book");
const sequelize = require("../../database/config");

const UserWishListService = {
    addBookWishList: async (userId, bookId) => {
        const transaction = await sequelize.transaction();
        try {
            // Validações básicas
            const [user, book] = await Promise.all([
                User.findByPk(userId, { transaction }),
                Book.findByPk(bookId, { transaction })
            ]);

            if (!user) {
                await transaction.rollback();
                return {
                    code: 404,
                    message: "Usuário não encontrado",
                    success: false
                };
            }

            if (!book) {
                await transaction.rollback();
                return {
                    code: 404,
                    message: "Livro não encontrado",
                    success: false
                };
            }

            // Garante que Lidos seja um array
            const desejoLeitura = user.desejoLeitura ? [...user.desejoLeitura] : [];

            // Verifica se já é favorito
            if (desejoLeitura.includes(bookId)) {
                await transaction.rollback();
                return {
                    code: 400,
                    message: "Livro já está na lista de desejos",
                    success: false,
                };
            }

            // Adiciona o favorito
            desejoLeitura.push(bookId);
            await user.update({ desejoLeitura: desejoLeitura }, { transaction });

            await transaction.commit();

            return {
                code: 200,
                message: "Livro adicionado a lista de desejos com sucesso",
                data: {
                    bookId: parseInt(bookId)
                },
                success: true
            };

        } catch (error) {
            await transaction.rollback();
            console.error("Erro no UserWishListService:", error);
            return {
                code: 500,
                message: "Erro interno ao adicionar livro na lista de desejos",
                error: error.message,
                success: false
            };
        }
    }
}

module.exports = UserWishListService;