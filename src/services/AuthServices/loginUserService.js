const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const bycrpt = require("bcryptjs");

const RegisterUserService = async (dataUser) => {
  try {

    const { email, password } = dataUser;

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return {
        code: 400,
        error: {
          details: [
            {
              field: "email",
              message: "Email não encontrado",
            },
          ],
        },
        message: "Erro ao validar login",
        success: false,
      };
    }

    // Validar a senha
    const passwordDecode = await bycrpt.compareSync(password, user.dataValues.password);
    if (!passwordDecode) {
      return {
        code: 401,
        error: {
          details: [
            {
              field: "password",
              message: "Senha incorreta",
            },
          ],
        },
        message: "Erro ao validar login",
        success: false,
      };
    }

    // Criar o token de autenticação
    const token = await jwt.sign(
      {
        id: user.dataValues.id,
        email: user.dataValues.email,
        isDisabled: user.dataValues.isDisabled,
        techAss: user.dataValues.techAss,
      },
      process.env.SECRET,
      { expiresIn: "10h" }
    );

    await user.update({ validToken: token });

    return {
      code: 201,
      data: {
        token,
        user: user.dataValues.id,
      },
      message: "Login usuário com sucesso",
      success: true,
    };
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

module.exports = RegisterUserService;