const Disabled = require("../../models/Disabled");
const User = require("../../models/User");
const UserDisabled = require("../../models/UsersDisableds");
// const UserDisabled = require("../../models/UsersDisableds");
const UsersDisabled = require("../../models/UsersDisableds");

const UsersDisabledCreateService = async (dataCreate, transaction = null) => {
  try {
    // idUser
    // idDisabled

    // Validar se existe o user
    const user = await User.findByPk(dataCreate.idUser, { transaction });
    if (!user) {
      return {
        code: 404,
        error: {
          details: [
            {
              field: "idUser",
              message: "Usuario não encontrado",
            },
          ],
        },
        message: "Erro ao validar UsersDisabledCreate",
        success: false,
      };
    }

    // Validar se o user e um user com deficiencia
    if (!user.isDisabled) {
      return {
        code: 400,
        error: {
          details: [
            {
              field: "idUser",
              message:
                "Não e possivel criar esse usuario com deficiencia, pois ele esta com o isDisabled false",
            },
          ],
        },
        message: "Erro ao validar UsersDisabledCreate",
        success: false,
      };
    }

    // Validar se existe a deficiencia
    const disabled = await Disabled.findByPk(dataCreate.idDisabled, {
      transaction,
    });
    if (!disabled) {
      return {
        code: 404,
        error: {
          details: [
            {
              field: "idDisabled",
              message: "Disabled não encontrado",
            },
          ],
        },
        message: "Erro ao validar UsersDisabledCreate",
        success: false,
      };
    }

    // Validar se ja não existe o user com def criado
    const existsUserDisabled = await UserDisabled.findOne({
      where: { idUser: user.id },
    });
    if (existsUserDisabled) {
      return {
        code: 400,
        error: {
          details: [
            {
              field: "idUser",
              message: "Esse user ja existe na tabela de userDisabled",
            },
          ],
        },
        message: "Erro ao validar UsersDisabledCreate",
        success: false,
      };
    }

    const userDisabled = await UsersDisabled.create(dataCreate, {
      transaction,
    });

    return {
      code: 201,
      data: userDisabled,
      message: "Usuario com deficiencia criado com sucesso",
      success: true,
    };
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

module.exports = UsersDisabledCreateService;
