const User = require("../../models/User");

const UserGetAllService = async (query) => {
  try {
    // Verificando se querem que enviem apenas usuarios com def
    const { onlyDisabled = false } = query;

    if (onlyDisabled === "true") {
      const users = await User.findAll({
        where: {
          isDisabled: true,
        },
      });

      return {
        code: 200,
        users,
        message: "Todos os users encontrados",
        success: true,
      };
    }

    // Pegando todos os usuarios criados
    const users = await User.findAll();

    // Pequena validação, se caso não tiver nenhum user criado
    if (users.length === 0) {
      return {
        code: 200,
        users,
        message: "Nenhum user encontrado",
        success: true,
      };
    }

    return {
      code: 200,
      users,
      message: "Todos os users encontrados",
      success: true,
    };
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

module.exports = UserGetAllService;
