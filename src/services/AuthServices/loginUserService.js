const User = require("../../models/User");
const bycrpt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const LoginUserService = async (dataLogin) => {
  try {
    // email
    // password

    const user = await User.findOne({ where: { email: dataLogin.email } });
    if (!user) {
      return {
        code: 400,
        error: {
          details: [
            {
              field: "email",
              message: "O email enviado não existe",
            },
          ],
        },
        message: "Erro ao validar login",
        success: false,
      };
    }

    // se achou o user, validar se a senha e a mesma enviada
    const passwordDecode = await bycrpt.compareSync(
      dataLogin.password,
      user.password
    );

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

    console.log(user);
    const token = await jwt.sign(
      {
        id: user.id,
        email: user.email,
        isDisabled: user.isDisabled,
        techAss: user.techAss,
      },
      process.env.SECRET,
      { expiresIn: "10h" }
    );

    return {
      code: 201,
      data: {
        token,
        user,
      },
      message: "login realizado com sucesso",
      success: true,
    };
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

module.exports = LoginUserService;
