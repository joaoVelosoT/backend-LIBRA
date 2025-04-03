const User = require("../../models/User");
const Book = require("../../models/Book");

const UserGetAllService = async (query) => {
  try {
    const { onlyDisabled = false } = query;

    // Configuração base da query
    const baseOptions = {
      attributes: ['id', 'name', 'email', 'isDisabled', 'favoritos', 'createdAt', 'updatedAt']
    };

    if (onlyDisabled === "true") {
      baseOptions.where = { isDisabled: true };
    }

    const users = await User.findAll(baseOptions);

    // Para cada usuário, buscar os livros favoritos se existirem
    const usersWithFavorites = await Promise.all(
      users.map(async (user) => {
        const userData = user.get({ plain: true });
        let favoriteBooks = [];
        
        if (userData.favoritos && userData.favoritos.length > 0) {
          favoriteBooks = await Book.findAll({
            where: { id: userData.favoritos },
            attributes: ['id', 'titulo', 'autor', 'notaMedia']
          });
        }

        return {
          ...userData,
          livrosFavoritos: favoriteBooks
        };
      })
    );

    if (usersWithFavorites.length === 0) {
      return {
        code: 200,
        data: [],
        message: onlyDisabled === "true" 
          ? "Nenhum usuário desabilitado encontrado" 
          : "Nenhum usuário encontrado",
        success: true,
      };
    }

    return {
      code: 200,
      data: usersWithFavorites,
      message: onlyDisabled === "true"
        ? "Todos os usuários desabilitados encontrados"
        : "Todos os usuários encontrados",
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      code: 500,
      error: {
        details: [{
          service: "UserGetAllService",
          message: error.message
        }]
      },
      message: "Erro ao buscar usuários",
      success: false
    };
  }
};

module.exports = UserGetAllService;