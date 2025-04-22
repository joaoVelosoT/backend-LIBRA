// services/UsersServices/UserFavoritesService.js
const User = require("../../models/User");
const Book = require("../../models/Book");
const Capa = require("../../models/Capa");
const Banner = require("../../models/Banner");
const Arquivos = require("../../models/Arquivos");
const sequelize = require("../../database/config");

const UserLidosService = {
    addRead: async (userId, bookId) => {
        const transaction = await sequelize.transaction();
        try {
            // Verifica se o livro existe
            const bookExists = await Book.findByPk(bookId, { transaction });

            if (!bookExists) {
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

            // Garante que Lidos seja um array
            const lidos = user.lidos ? [...user.lidos] : [];

            // Verifica se já é favorito
            if (lidos.includes(bookId)) {
                await transaction.rollback();
                return {
                    code: 400,
                    message: "Livro já está na lista de lidos",
                    success: false,
                };
            }

            // Adiciona o favorito
            lidos.push(bookId);
            await user.update({ lidos: lidos }, { transaction });

            await transaction.commit();

            return {
                code: 200,
                message: "Livro adicionado a lista de lidos com sucesso",
                success: true,
                data: {
                    userId,
                    bookId,
                    LidosCount: lidos.length
                }
            };
        } catch (error) {
            await transaction.rollback();
            console.error("Erro no UserLidosService (addRead):", error);
            return {
                code: 500,
                message: "Erro interno ao adicionar livro a lista de lidos.",
                error: error.message,
                success: false,
            };
        }
    },
    removeRead: async (userId, bookId) => {
        const transaction = await sequelize.transaction();
        try {
            const user = await User.findByPk(userId, { transaction });
            if (!user) {
                await transaction.rollback();
                return {
                    code: 404,
                    message: "Usuário não encontrado",
                    success: false,
                };
            }

            // Garante que favoritos seja um array
            let lidos = user.lidos ? [...user.lidos] : [];

            // Verifica se o livro está nos favoritos
            const index = lidos.indexOf(bookId);
            if (index === -1) {
                await transaction.rollback();
                return {
                    code: 400,
                    message: "Livro não está na lista dos lidos",
                    success: false,
                };
            }

            // Remove o favorito
            lidos.splice(index, 1);
            await user.update({ lidos: lidos }, { transaction });

            await transaction.commit();

            return {
                code: 200,
                message: "Livro removido da lista de lidos com sucesso",
                success: true,
                data: {
                    userId,
                    bookId,
                    favoritesCount: lidos.length
                }
            };
        } catch (error) {
            await transaction.rollback();
            console.error("Erro no UserLidosService (removeRead):", error);
            return {
                code: 500,
                message: "Erro interno ao remover livro dos lidos.",
                error: error.message,
                success: false,
            };
        }
    }
};

module.exports = UserLidosService;