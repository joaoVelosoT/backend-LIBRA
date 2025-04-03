// services/UsersServices/UserFavoritesService.js
const User = require("../../models/User");
const Book = require("../../models/Book");
const Capa = require("../../models/Capa");
const Banner = require("../../models/Banner");
const Arquivos = require("../../models/Arquivos");
const sequelize = require("../../database/config");

const UserFavoritesService = {
  addFavorite: async (userId, bookId) => {
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

      // Garante que favoritos seja um array
      const favorites = user.favoritos ? [...user.favoritos] : [];

      // Verifica se já é favorito
      if (favorites.includes(bookId)) {
        await transaction.rollback();
        return {
          code: 400,
          message: "Livro já está nos favoritos",
          success: false,
        };
      }

      // Adiciona o favorito
      favorites.push(bookId);
      await user.update({ favoritos: favorites }, { transaction });

      await transaction.commit();

      return {
        code: 200,
        message: "Livro adicionado aos favoritos com sucesso",
        success: true,
        data: {
          userId,
          bookId,
          favoritesCount: favorites.length
        }
      };
    } catch (error) {
      await transaction.rollback();
      console.error("Erro no UserFavoritesService (addFavorite):", error);
      return {
        code: 500,
        message: "Erro interno ao adicionar favorito",
        error: error.message,
        success: false,
      };
    }
  },

  removeFavorite: async (userId, bookId) => {
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
      let favorites = user.favoritos ? [...user.favoritos] : [];

      // Verifica se o livro está nos favoritos
      const index = favorites.indexOf(bookId);
      if (index === -1) {
        await transaction.rollback();
        return {
          code: 400,
          message: "Livro não está nos favoritos",
          success: false,
        };
      }

      // Remove o favorito
      favorites.splice(index, 1);
      await user.update({ favoritos: favorites }, { transaction });

      await transaction.commit();

      return {
        code: 200,
        message: "Livro removido dos favoritos com sucesso",
        success: true,
        data: {
          userId,
          bookId,
          favoritesCount: favorites.length
        }
      };
    } catch (error) {
      await transaction.rollback();
      console.error("Erro no UserFavoritesService (removeFavorite):", error);
      return {
        code: 500,
        message: "Erro interno ao remover favorito",
        error: error.message,
        success: false,
      };
    }
  },

  getFavorites: async (userId) => {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return {
          code: 404,
          message: "Usuário não encontrado",
          success: false,
        };
      }

      // Garante que favoritos seja um array
      const favorites = user.favoritos ? [...user.favoritos] : [];

      // Busca os livros favoritos com informações completas
      const favoriteBooks = await Book.findAll({
        where: {
          id: favorites
        },
        include: [
          {
            model: Capa,
            as: 'capa',
            include: [{ model: Arquivos, as: 'arquivo' }]
          },
          {
            model: Banner,
            as: 'banner',
            include: [{ model: Arquivos, as: 'arquivo' }]
          }
        ],
        order: [['titulo', 'ASC']]
      });

      return {
        code: 200,
        data: favoriteBooks,
        message: "Favoritos recuperados com sucesso",
        success: true,
      };
    } catch (error) {
      console.error("Erro no UserFavoritesService (getFavorites):", error);
      return {
        code: 500,
        message: "Erro interno ao recuperar favoritos",
        error: error.message,
        success: false,
      };
    }
  }
};

module.exports = UserFavoritesService;