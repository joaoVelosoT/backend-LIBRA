const User = require("../../models/User");
const bycrpt = require("bcryptjs");
const UserUpdateService = async (dataUpdate) => {
  try {
    /*
    idUser,
    dataUpdate
    */

    // Buscar o user
    const user = await User.findByPk(dataUpdate.idUser);

    // Validar se o user foi encontrado
    if (!user) {
      return {
        code: 404,
        error: {
          details: [
            {
              message: "Usuario não encontrado",
            },
          ],
        },
        message: "Erro ao buscar user por id",
        success: false,
      };
    }

    // Se o usuario enviou o email para atualizar, validar se ja existe alguem com este email
    if (dataUpdate.dataUpdate.email) {
      const existsEmail = await User.findOne({
        where: { email: dataUpdate.dataUpdate.email },
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
    }

    // Se o usuario enviou a senha para atualizar, criptografar a senha
    if (dataUpdate.dataUpdate.password) {
      // criptografar a senha
      const passwordCript = await bycrpt.hashSync(
        dataUpdate.dataUpdate.password,
        12
      );

      // Mudando o password do dataUser para a senha criptografada
      dataUpdate.dataUpdate.password = passwordCript;
    }

    // Atualizar o user
    await user.update(dataUpdate.dataUpdate);

    return {
      code: 200,
      user,
      message: "User atualizado com sucesso",
      success: true,
    };
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

module.exports = UserUpdateService;
