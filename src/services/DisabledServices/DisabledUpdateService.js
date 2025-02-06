const Disabled = require("../../models/Disabled");

const DisabledUpdateService = async (dataUpdate) => {
  try {
    const disabled = await Disabled.findByPk(dataUpdate.id);

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
        message: "Erro ao buscar deficiência por id",
        success: false,
      };
    }

    await disabled.update(dataUpdate.data);

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
        details: [
          {
            service: "DisabledUpdateService",
            message: "Erro interno ao atualizar deficiência",
          },
        ],
      },
      message: "Erro ao atualizar deficiência",
      success: false,
    };
  }
};

module.exports = DisabledUpdateService;