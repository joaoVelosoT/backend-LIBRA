const User = require("../../models/User");
const bycrpt = require("bcryptjs");
const UserCreateService = async (dataUser) => {
  try {
    //name
    //email -> validar se ja existe alguem com esse email
    //password -> criptografar a senha
    //isDisabled
    //techAss

    const existsEmail = await User.findOne({ email: dataUser.email });
    if (existsEmail) {
      return {
        code: 409,
        error: {
          details: [
            {
              field: "email",
              message: "O email enviado ja existe",
            },
          ],
        },
        message: "Erro ao validar user",
        sucess: false,
      };
    }

    // criptografar a senha
    const passwordCript = await bycrpt.hashSync(dataUser.password, 12);

    // Mudando o password do dataUser para a senha criptografada
    dataUser.password = passwordCript;
    const user = await User.create(dataUser);

    return {
      code: 201,
      user,
      message: "User criado com sucesso",
      sucess: true,
    };
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};
module.exports = UserCreateService;
