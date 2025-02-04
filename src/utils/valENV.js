const valENV = async () => {
  try {
    const errors = [];

    if (!process.env.DB_HOST) {
      errors.push({
        field: "DB_HOST",
        message: "a variavel de ambiente DB_HOST é obrigatorio",
      });
    }

    if (!process.env.SECRET) {
        errors.push({
          field: "SECRET",
          message: "a variavel de ambiente SECRET é obrigatorio",
        });
      }

    if (!process.env.DB_NAME) {
      errors.push({
        field: "DB_NAME",
        message: "a variavel de ambiente DB_NAME é obrigatorio",
      });
    }

    if (!process.env.DB_USER) {
      errors.push({
        field: "DB_USER",
        message: "a variavel de ambiente DB_USER é obrigatorio",
      });
    }

    if (!process.env.DB_PASSWORD) {
      errors.push({
        field: "DB_PASSWORD",
        message: "a variavel de ambiente DB_PASSWORD é obrigatorio",
      });
    }

    if (errors.length !== 0) {
      return errors;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

module.exports = valENV;



