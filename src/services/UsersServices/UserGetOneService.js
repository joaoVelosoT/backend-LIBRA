const User = require("../../models/User");

const UserGetOneService = async (idUser) => {
  try {
    // Buscar o usuario por id
    const user = await User.findByPk(idUser);
    if (!user) {
      return {
        code: 404,
        error: {
          details: [
            {
              message: "Usuario não encontrado",
            },
          ],
        },
        message: "Erro ao buscar user por id",
        success: false,
      };
    }

    return {
      code: 200,
      user,
      message: "User encontrado com sucesso",
      success: true,
    };
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

module.exports = UserGetOneService;
