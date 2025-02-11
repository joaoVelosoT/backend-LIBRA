const Disabled = require("../../models/Disabled");
const TypesDisabled = require("../../models/typesDisabled");

const DisabledCreateService = async (data) => {
  try {
    // Verificar se o tipo de deficiência existe
    const disabledTypes = await TypesDisabled.findByPk(data.idDisabledTypes);
    if (!disabledTypes) {
      return {
        code: 400,
        error: {
          details: [
            {
              field: "idDisabledTypes",
              message: "A deficiência enviada não existe (idDisabledTypes)",
            },
          ],
        },
        message: "Erro ao validar DisabledCreate",
        success: false,
      };
    }

    // Verificar se já existe uma deficiência com o mesmo nome
    const existingDisabled = await Disabled.findOne({
      where: { name: data.name },
    });
    if (existingDisabled) {
      return {
        code: 409,
        error: {
          details: [
            {
              field: "name",
              message: "Deficiência com mesmo nome já cadastrada no banco de dados",
            },
          ],
        },
        message: "Erro ao validar DisabledCreate",
        success: false,
      };
    }

    // Criar nova deficiência
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