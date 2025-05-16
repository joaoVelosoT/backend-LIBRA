const UserCreateService = require("../UsersServices/UserCreateService");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const RegisterUserService = async (dataUser) => {
  try {
    console.log("Dados recebidos para registro:", dataUser);

    // Create user through UserCreateService
    const creationResult = await UserCreateService(dataUser);
    
    if (!creationResult.success) {
      console.log("Falha na criação do usuário:", creationResult.message);
      return creationResult;
    }

    const createdUser = creationResult.data;

    // Generate JWT token
    const token = jwt.sign(
      {
        id: createdUser.id,
        email: createdUser.email,
        isDisabled: createdUser.isDisabled,
        techAss: createdUser.techAss
      },
      process.env.SECRET,
      { expiresIn: "10h" }
    );

    // Update user with valid token
    await User.update(
      { validToken: token },
      { where: { id: createdUser.id } }
    );

    // Prepare response data
    const responseData = {
      token,
      user: {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
        isDisabled: createdUser.isDisabled,
        techAss: createdUser.techAss,
        createdAt: createdUser.createdAt,
        updatedAt: createdUser.updatedAt
      }
    };

    console.log(`Usuário ${createdUser.name}istrado com sucesso`);
    
    return {
      code: 201,
      data: responseData,
      message: "Cadastro realizado com sucesso",
      success: true
    };

  } catch (error) {
    console.error("Erro no processo de registro:", error);
    return {
      code: 500,
      message: "Erro interno no servidor",
      success: false,
      error: { 
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }
    };
  }
};

module.exports = RegisterUserService;