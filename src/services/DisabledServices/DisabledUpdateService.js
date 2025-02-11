const Disabled = require("../../models/Disabled");
const DisabledType = require("../../models/typesDisabled");

const DisabledUpdateService = async (id, data) => {
  try {
    const disabled = await Disabled.findByPk(id);

    if (!disabled) {
      return {
        code: 404,
        error: {
          details: [{ message: "Deficiência não encontrada" }],
        },
        message: "Erro ao buscar deficiência por ID",
        success: false,
      };
    }

    if (data.idDisabledTypes !== undefined) {
      const disabledTypeExists = await DisabledType.findByPk(data.idDisabledTypes);
      if (!disabledTypeExists) {
        return {
          code: 404,
          error: {
            details: [{ message: "Tipo de deficiência não encontrado" }],
          },
          message: "Erro ao validar id_disabled_types",
          success: false,
        };
      }
    }

    await disabled.update(data);

    return {
      code: 200,
      data: disabled,
      message: "Deficiência atualizada com sucesso",
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      code: 500,
      error: {
        details: [{ service: "DisabledUpdateService", message: "Erro interno ao atualizar deficiência" }],
      },
      message: "Erro ao atualizar deficiência",
      success: false,
    };
  }
};

module.exports = DisabledUpdateService;
