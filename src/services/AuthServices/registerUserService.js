const UserCreateService = require("../UsersServices/UserCreateService");
const jwt = require("jsonwebtoken");

const RegisterUserService = async (dataUser) => {
  try {

    console.log(dataUser);

    // Criar o usuario
    const user = await UserCreateService(dataUser);

    // Se der algum erro na criação, retornar
    if (!user.success) {
      return user;
    }

    // Criar o token de autenticação -> token com alto tempo de duração para facilitar nos testes
    const token = await jwt.sign(
      {
        id: user.user.id,
        email: user.user.email,
        isDisabled: user.user.isDisabled,
        techAss: user.user.techAss,
      },
      process.env.SECRET,
      { expiresIn: "10h" }
    );

    return {
      code: 201,
      data: {
        token,
        user: user.user,
      },
      message: "User cadastrado com sucesso",
      success: true,
    };
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

module.exports = RegisterUserService;
