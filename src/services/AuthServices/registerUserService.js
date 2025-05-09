const UserCreateService = require("../UsersServices/UserCreateService");
const jwt = require("jsonwebtoken");

const RegisterUserService = async (dataUser) => {
  try {
    console.log("Dados recebidos:", dataUser);

    const user = await UserCreateService(dataUser);
    
    if (!user.success) {
      console.log("Erro na criação:", user.message);
      return user;
    }

    const token = jwt.sign(
      {
        id: user.user.id,
        email: user.user.email,
        isDisabled: user.user.isDisabled,
        techAss: user.user.techAss
      },
      process.env.SECRET,
      { expiresIn: "10h" }
    );

    await user.user.update({ validToken: token });
    
    const userResponse = { ...user.user.get({ plain: true }) };
    delete userResponse.password;
    delete userResponse.validToken;

    console.log("Usuário criado com sucesso:", userResponse.email);
    return {
      code: 201,
      data: { token, user: userResponse },
      message: "Cadastro realizado",
      success: true
    };
  } catch (error) {
    console.error("Erro no RegisterUserService:", error);
    return {
      code: 500,
      message: "Erro interno",
      success: false,
      error: { details: error.message }
    };
  }
};

module.exports = RegisterUserService;