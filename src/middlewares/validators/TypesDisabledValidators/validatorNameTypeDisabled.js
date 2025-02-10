const validateIsNumber = require("../../../utils/isNumber");

const validateIsSpecialCharacter = require("../../../utils/isSpecialCharacter");

const validatorNameTypeDisabled = async (req, res, next) => {
  try {
    const { name } = req.body;

    var errorMessage = {
      message: "Erro na validação de nome, tipo de deficiência.",
    };

    if (name === "" || name === undefined) {
      errorMessage.details = "'name' não pode ser vazio";
      return res.status(400).json({
        code: 400,
        error: {
          details: [{ errorMessage }],
        },
        message: "Erro no typeDisabledCreateController",
        sucess: false,
      });
    }

    const verificationSpecialChars = await validateIsSpecialCharacter(name);

    if (verificationSpecialChars !== true) {
      errorMessage.details = "Nome não pode ter caracteres especiais";
      return res.status(400).json({
        code: 400,
        error: {
          details: [{ errorMessage }],
        },
        message: "Erro no typeDisabledCreateController",
        sucess: false,
      });
    }

    const verificationIsNumber = await validateIsNumber(name);

    if (verificationIsNumber !== true) {
      errorMessage.details = "Nome não pode ter números";
      return res.status(400).json({
        code: 400,
        error: {
          details: [{ errorMessage }],
        },
        message: "Erro no typeDisabledCreateController",
        sucess: false,
      });
    }

    return next();
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

module.exports = validatorNameTypeDisabled;
