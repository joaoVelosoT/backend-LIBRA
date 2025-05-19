const User = require("../../models/User");
const bycrpt = require("bcryptjs");
const UserDisabled = require("../../models/UsersDisableds");
const UsersDisabledCreateService = require("../UsersDisabledServices/UsersDisabledCreateService");
const sequelize = require("../../database/config");

const UserCreateService = async (dataUser) => {
  const transaction = await sequelize.transaction();
  
  try {
    // Verify email before critical operations
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

    // Encrypt password
    const passwordCript = await bycrpt.hash(dataUser.password, 12);

    // Prepare user data
    const userData = {
      name: dataUser.name,
      email: dataUser.email,
      password: passwordCript,
      isDisabled: dataUser.isDisabled || false,
      techAss: dataUser.techAss || null
    };

    // Create user
    const user = await User.create(userData, { transaction });

    // For disabled users, create disability relationship
    if (userData.isDisabled && dataUser.idDisabled) {
      const userDisabled = await UsersDisabledCreateService(
        { 
          idUser: user.id, 
          idDisabled: dataUser.idDisabled 
        },
        transaction
      );

      if (!userDisabled.success) {
        await transaction.rollback();
        return {
          code: userDisabled.code || 400,
          error: userDisabled.error || { details: [{ message: "Erro ao criar relação com deficiência" }] },
          message: userDisabled.message || "Erro ao associar deficiência ao usuário",
          success: false
        };
      }
    }

    await transaction.commit();
    
    // Prepare response without sensitive data
    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      isDisabled: user.isDisabled,
      techAss: user.techAss,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    return {
      code: 201,
      data: userResponse,
      message: "Usuário criado com sucesso",
      success: true
    };

  } catch (error) {
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