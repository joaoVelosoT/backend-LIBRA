const Disabled = require("../../models/Disabled");

const DisabledCreateService = async (data) => {
  try {
    const newDisabled = await Disabled.create(data);
    return {
      code: 201,
      data: newDisabled,
      message: "Deficiência cadastrada com sucesso",
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      code: 500,
      error: {
        details: [
          {
            service: "DisabledCreateService",
            message: "Erro interno ao cadastrar deficiência",
          },
        ],
      },
      message: "Erro ao cadastrar deficiência",
      success: false,
    };
  }
};

module.exports = DisabledCreateService;
