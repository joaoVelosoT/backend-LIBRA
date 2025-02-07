const Disabled = require("../../models/Disabled");
const User = require("../../models/User");
// const UserDisabled = require("../../models/UsersDisableds");
const UsersDisabled = require("../../models/UsersDisableds");

const UsersDisabledCreateService = async (dataCreate) => {
  try {
    // idUser
    // idDisabled

    // Validar se existe o user
    const user = await User.findByPk(dataCreate.idUser);
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

    // Validar se existe a deficiencia
    const disabled = await Disabled.findByPk(dataCreate.idDisabled);
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

    const userDisabled = await UsersDisabled.create(dataCreate);

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
