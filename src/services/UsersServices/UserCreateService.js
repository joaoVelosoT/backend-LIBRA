const User = require("../../models/User");
const bycrpt = require("bcryptjs");
const UserDisabled = require("../../models/UsersDisableds");
const UsersDisabledCreateService = require("../UsersDisabledServices/UsersDisabledCreateService");
const sequelize = require("../../database/config");

const UserCreateService = async (dataUser) => {
  const transaction = await sequelize.transaction();

  try {
    // Verificar se o email já existe
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
              message: "O email enviado já existe",
            },
          ],
        },
        message: "Erro ao validar usuário",
        success: false,
      };
    }

    // Criptografar a senha
    const passwordCript = await bycrpt.hashSync(dataUser.password, 12);

    // Substituir a senha no dataUser pela senha criptografada
    dataUser.password = passwordCript;

    // Criar o usuário
    const user = await User.create(dataUser, { transaction });

    // Se o usuário for deficiente, criar ele na tabela UsersDisabled
    if (dataUser.isDisabled) {
      const userDisabled = await UsersDisabledCreateService(
        {
          idUser: user.id,
          idDisabled: dataUser.idDisabled,
        },
        transaction
      );

      // Se houver erro ao criar o usuário deficiente, desfazer a transação
      if (!userDisabled.success) {
        await transaction.rollback();
        return userDisabled;
      }
    }

    // Confirmar a transação
    await transaction.commit();

    return {
      code: 201,
      user, // Retornar o usuário criado
      message: "Usuário criado com sucesso",
      success: true,
    };
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    throw new Error(error.message);
  }
};

module.exports = UserCreateService;