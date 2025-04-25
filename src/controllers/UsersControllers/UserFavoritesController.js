const UserFavoritesService = require("../../services/UsersServices/UserFavoritesService");

const UserFavoritesController = {
  addFavorite: async (req, res) => {
    try {
      const { id } = req.params; // ID do usuário
      const { bookId } = req.body;

      if (!bookId) {
        return res.status(400).json({
          code: 400,
          message: "O ID do livro é obrigatório",
          success: false,
        });
      }

      const result = await UserFavoritesService.addFavorite(id, bookId);
      return res.status(result.code).json(result);
    } catch (error) {
      console.error("Erro no UserFavoritesController (add):", error);
      return res.status(500).json({
        code: 500,
        message: "Erro interno ao adicionar favorito",
        error: error.message,
        success: false,
      });
    }
  },

  removeFavorite: async (req, res) => {
    try {
      const { id } = req.params; // ID do usuário
      const { bookId } = req.body;

      if (!bookId) {
        return res.status(400).json({
          code: 400,
          message: "O ID do livro é obrigatório",
          success: false,
        });
      }

      const result = await UserFavoritesService.removeFavorite(id, bookId);
      return res.status(result.code).json(result);
    } catch (error) {
      console.error("Erro no UserFavoritesController (remove):", error);
      return res.status(500).json({
        code: 500,
        message: "Erro interno ao remover favorito",
        error: error.message,
        success: false,
      });
    }
  },

  getFavorites: async (req, res) => {
    try {
      const { id } = req.params; // ID do usuário
      const result = await UserFavoritesService.getFavorites(id);
      return res.status(result.code).json(result);
    } catch (error) {
      console.error("Erro no UserFavoritesController (get):", error);
      return res.status(500).json({
        code: 500,
        message: "Erro interno ao recuperar favoritos",
        error: error.message,
        success: false,
      });
    }
  }
};

module.exports = UserFavoritesController;