const User = require("../../models/User");

const UserLogoutService = async (userId) => {
  try {
    // Busca o usuário no banco de dados
    const user = await User.findOne({ where: { id: userId } });

    if (user) {
      await user.update({ validToken: null });
      console.log("Token invalidado com sucesso para o usuário:", user.id); // Log para depuração
    }

    return {
      code: 200,
      message: "Logout realizado com sucesso",
      success: true,
    };
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

module.exports = UserLogoutService;