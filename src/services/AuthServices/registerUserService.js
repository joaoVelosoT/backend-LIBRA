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

    // Atualizar o campo validToken no banco de dados
    await user.user.update({ validToken: token });

    // Remover o campo validToken do objeto user antes de retornar
    const userResponse = { ...user.user.dataValues };
    delete userResponse.validToken;

    return {
      code: 201,
      data: {
        token, // Retorna apenas o token aqui
        user: userResponse, // Retorna o usuário sem o campo validToken
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