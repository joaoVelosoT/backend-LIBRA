const Disabled = require("../../models/Disabled");
const TypesDisabled = require("../../models/typesDisabled");

const DisabledCreateService = async (data) => {
  try {
    // id_disabled_types -> validar se existe esse tipo de disabled
    const disabledTypes = await TypesDisabled.findByPk(data.id_disabled_types);
    if (!disabledTypes) {
      return {
        code: 400,
        error: {
          details: [
            {
              field: "id_disabled_types",
              message: "A deficiencia enviada não existe",
            },
          ],
        },
        message: "Erro ao validar DisabledCreate",
        success: false,
      };
    }

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
