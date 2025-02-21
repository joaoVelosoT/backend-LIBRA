const isEmail = async (email) => {
  try {
    const domainsEmail = [
      "gmail.com",
      "outlook.com",
      "hotmail.com",
      "yahoo.com",
    ];

    // Cortando o email
    const emailSplit = email.split("@");

    // Validando se tem @ e se não possui mais de 1 @
    if (emailSplit.length < 2 || emailSplit.length > 2) {
      return false;
    }

    // Validar se o email possui algum dominio
    if (!domainsEmail.includes(emailSplit[1])) {
      return false;
    }

    return true;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

module.exports = isEmail;
