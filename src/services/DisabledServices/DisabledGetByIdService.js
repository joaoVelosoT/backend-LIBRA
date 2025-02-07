const Disabled = require("../../models/Disabled");

const DisabledGetByIdService = async (id) => {
  try {
    const disabled = await Disabled.findByPk(id);
    if (!disabled) {
      return {
        code: 404,
        data: null,
        message: "Deficiência não encontrada",
        success: false,
      };
    }
    return {
      code: 200,
      data: disabled,
      message: "Deficiência encontrada com sucesso",
      success: true,
    };
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

module.exports = DisabledGetByIdService;