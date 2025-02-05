const Disabled = require("../../models/Disabled");

const DisabledGetAllService = async () => {
  try {
    const disableds = await Disabled.findAll();
    if (disableds.length === 0) {
      return {
        code: 200,
        data: disableds,
        message: "Nenhuma deficiência encontrada",
        success: true,
      };
    }
    return {
      code: 200,
      data: disableds,
      message: "Lista de deficiências obtida com sucesso",
      success: true,
    };
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

module.exports = DisabledGetAllService;
