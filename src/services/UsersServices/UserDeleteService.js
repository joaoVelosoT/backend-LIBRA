const User = require("../../models/User");

const UserDeleteService = async (idUser) => {
  try {
    // Validar se existe o usuario
    const user = await User.findByPk(idUser);
    if (!user) {
      return {
        code: 404,
        error: {
          details: [
            {
              message: "User não encontrado",
            },
          ],
        },
        message: "Erro ao buscar user por id",
        success: false,
      };
    }

    // Deletando o usuario
    await user.destroy();

    return {
      code: 200,
      user,
      message: "User deletado com sucesso",
      success: true,
    };
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

module.exports = UserDeleteService;
