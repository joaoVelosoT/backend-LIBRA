const Disabled = require("../../models/Disabled");

const DisabledDeleteService = async (idDisabled) => {
  try {
    const disabled = await Disabled.findByPk(idDisabled);
    if (!disabled) {
      return {
        code: 404,
        error: {
          details: [
            {
              message: "Deficiência não encontrada",
            },
          ],
        },
        message: "Erro ao buscar deficiência por ID",
        success: false,
      };
    }

    await disabled.destroy();

    return {
      code: 200,
      disabled,
      message: "Deficiência deletada com sucesso",
      success: true,
    };
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

module.exports = DisabledDeleteService;
