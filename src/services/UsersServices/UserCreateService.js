const User = require("../../models/User");
const bycrpt = require("bcryptjs");
const UserDisabled = require("../../models/UsersDisableds");
const UsersDisabledCreateService = require("../UsersDisabledServices/UsersDisabledCreateService");
const sequelize = require("../../database/config");
const UserCreateService = async (dataUser) => {
  const transaction = await sequelize.transaction();

  try {
    //name
    //email -> validar se ja existe alguem com esse email
    //password -> criptografar a senha
    //isDisabled
    //techAss

    const existsEmail = await User.findOne({
      where: { email: dataUser.email },
    });

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
        success: false,
      };
    }

    // criptografar a senha
    const passwordCript = await bycrpt.hashSync(dataUser.password, 12);

    // Mudando o password do dataUser para a senha criptografada
    dataUser.password = passwordCript;

    // Criando o usuario
    const user = await User.create(dataUser, { transaction });
    console.log(user);
    // Se o usuario for deficiente, criar ele na tabela UsersDisabled
    if (dataUser.isDisabled) {
      const userDisabled = await UsersDisabledCreateService(
        {
          idUser: user.id,
          idDisabled: dataUser.idDisabled,
        },
        transaction
      );

      console.log(await userDisabled.error);

      // Se tiver tido algum problema ao criar o usuario com deficiencia, deletar o usuario ja criado
      if (!userDisabled.success) {
        await transaction.rollback();
        return userDisabled;
      }
    }

    // Confirmando a transação
    await transaction.commit();
    return {
      code: 201,
      user,
      message: "User criado com sucesso",
      success: true,
    };
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    throw new Error(error.message);
  }
};
module.exports = UserCreateService;
