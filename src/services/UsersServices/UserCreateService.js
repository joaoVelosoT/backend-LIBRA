const User = require("../../models/User");
const bycrpt = require("bcryptjs");
const UserDisabled = require("../../models/UsersDisableds");
const UsersDisabledCreateService = require("../UsersDisabledServices/UsersDisabledCreateService");
const sequelize = require("../../database/config");

const UserCreateService = async (dataUser) => {
  const transaction = await sequelize.transaction();
  
  try {
    // Verificar email ANTES de começar operações críticas
    const existsEmail = await User.findOne({
      where: { email: dataUser.email },
      transaction
    });

    if (existsEmail) {
      await transaction.rollback();
      return {
        code: 409,
        error: { details: [{ field: "email", message: "Email já cadastrado" }] },
        message: "Erro ao cadastrar usuário",
        success: false
      };
    }

    // Criptografar senha
    const passwordCript = await bycrpt.hash(dataUser.password, 12);
    dataUser.password = passwordCript;

    // Criar usuário
    const user = await User.create(dataUser, { transaction });

    // Se for usuário com deficiência
    if (dataUser.isDisabled) {
      const userDisabled = await UsersDisabledCreateService(
        { idUser: user.id, idDisabled: dataUser.idDisabled },
        transaction
      );

      if (!userDisabled.success) {
        await transaction.rollback();
        return userDisabled;
      }
    }

    // Commit apenas se tudo der certo
    await transaction.commit();
    
    return {
      code: 201,
      user,
      message: "Usuário criado com sucesso",
      success: true
    };
  } catch (error) {
    // Rollback automático em caso de erro
    await transaction.rollback();
    console.error("Erro no UserCreateService:", error);
    return {
      code: 500,
      message: "Erro interno no servidor",
      success: false,
      error: { details: error.message }
    };
  }
};

module.exports = UserCreateService;