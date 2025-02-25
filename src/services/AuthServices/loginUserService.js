const UserCreateService = require("../UsersServices/UserCreateService");
const jwt = require("jsonwebtoken");

const RegisterUserService = async (dataUser) => {
  try {
    console.log(dataUser);

    // Criar o usuário
    const user = await UserCreateService(dataUser);

    // Se der algum erro na criação, retornar
    if (!user.success) {
      return user;
    }

    // Criar o token de autenticação
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

    await user.user.update({ validToken: token });

    return {
      code: 201,
      data: {
        token,
        user: user.user,
      },
      message: "Usuário cadastrado com sucesso",
      success: true,
    };
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

module.exports = RegisterUserService;