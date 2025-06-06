// services/UsersServices/UserLidosService.js
const User = require("../../models/User");
const Book = require("../../models/Book");
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

            const lidos = user.lidos ? [...user.lidos] : [];
            const lidosIds = user.lidosIds ? [...user.lidosIds] : [];

            // Verifica se já está na lista de lidos
            if (lidosIds.includes(bookId)) {
                await transaction.rollback();
                return {
                    code: 400,
                    message: "Livro já está na lista de lidos",
                    success: false,
                };
            }

            // Adiciona o objeto do livro e o ID
            const livroLido = {
                id: bookId
            };

            lidos.push(livroLido);
            lidosIds.push(bookId);

            await user.update({ lidos, lidosIds }, { transaction });
            await transaction.commit();

            return {
                code: 200,
                message: "Livro adicionado à lista de lidos com sucesso",
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
                message: "Erro interno ao adicionar livro à lista de lidos.",
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

            let lidos = user.lidos ? [...user.lidos] : [];
            let lidosIds = user.lidosIds ? [...user.lidosIds] : [];

            // Verifica se o livro está na lista
            const idIndex = lidosIds.indexOf(bookId);
            if (idIndex === -1) {
                await transaction.rollback();
                return {
                    code: 400,
                    message: "Livro não está na lista de lidos",
                    success: false,
                };
            }

            // Remove o ID e o objeto correspondente
            lidosIds.splice(idIndex, 1);
            lidos = lidos.filter(livro => livro.id !== bookId);

            await user.update({ lidos, lidosIds }, { transaction });
            await transaction.commit();

            return {
                code: 200,
                message: "Livro removido da lista de lidos com sucesso",
                success: true,
                data: {
                    userId,
                    bookId,
                    LidosCount: lidos.length
                }
            };
        } catch (error) {
            await transaction.rollback();
            console.error("Erro no UserLidosService (removeRead):", error);
            return {
                code: 500,
                message: "Erro interno ao remover livro da lista de lidos.",
                error: error.message,
                success: false,
            };
        }
    }
};

module.exports = UserLidosService;
