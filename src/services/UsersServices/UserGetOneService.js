const User = require("../../models/User");
const Book = require("../../models/Book");

const UserGetOneService = async (userId) => {
  try {
    // Busca o usuário com seus atributos básicos
    const user = await User.findByPk(userId, {
      attributes: ['id', 'name', 'email', 'isDisabled', 'favoritos', 'createdAt', 'updatedAt']
    });

    if (!user) {
      return {
        code: 404,
        message: "Usuário não encontrado",
        success: false
      };
    }

    // Busca os livros favoritos se existirem
    let livrosFavoritos = [];
    if (user.favoritos && user.favoritos.length > 0) {
      livrosFavoritos = await Book.findAll({
        where: { id: user.favoritos },
        attributes: ['id', 'titulo', 'autor', 'notaMedia']
      });
    }

    // Formata a resposta corretamente
    return {
      code: 200,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        isDisabled: user.isDisabled,
        favoritos: user.favoritos,
        livrosFavoritos: livrosFavoritos,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      },
      message: "Usuário encontrado com sucesso",
      success: true
    };
    
  } catch (error) {
    console.error("Erro no UserGetOneService:", error);
    return {
      code: 500,
      error: {
        details: [{
          service: "UserGetOneService",
          message: error.message
        }]
      },
      message: "Erro ao buscar usuário",
      success: false
    };
  }
};

module.exports = UserGetOneService;