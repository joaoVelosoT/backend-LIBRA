const User = require("../../models/User");
const Book = require("../../models/Book");
const sequelize = require("../../database/config");

const UserRatingService = {
  rateBook: async (userId, bookId, rating) => {
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

      // Verifica favoritos
      const lidos = user.lidos || [];
      if (!lidos.includes(parseInt(bookId))) {
        await transaction.rollback();
        return {
          code: 400,
          message: "Adicione o livro aos lidos antes de avaliar",
          success: false
        };
      }

      // Atualiza avaliações
      const existingRatings = book.notas || [];
      const updatedRatings = existingRatings.filter(r => r.userId !== parseInt(userId));

      updatedRatings.push({
        userId: parseInt(userId),
        rating: parseFloat(rating),
        date: new Date()
      });

      // Calcula média
      const total = updatedRatings.reduce((sum, r) => sum + r.rating, 0);
      const average = total / updatedRatings.length;

      // Atualiza livro
      await book.update({
        notas: updatedRatings,
        notaMedia: parseFloat(average.toFixed(1)),
        totalAvaliacoes: updatedRatings.length
      }, { transaction });

      await transaction.commit();

      return {
        code: 200,
        message: "Avaliação registrada com sucesso",
        data: {
          bookId: parseInt(bookId),
          averageRating: parseFloat(average.toFixed(1)),
          totalRatings: updatedRatings.length,
          userRating: parseFloat(rating)
        },
        success: true
      };

    } catch (error) {
      await transaction.rollback();
      console.error("Erro no UserRatingService:", error);
      return {
        code: 500,
        message: "Erro interno ao processar avaliação",
        error: error.message,
        success: false
      };
    }
  }
};

module.exports = UserRatingService;