const isSpecialCharacter = async (verification) => {
    try {

        const validateIsSpecialCharacter = verification;

        let specialChars = /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/;

        const verificationSpecialChars = specialChars.test(validateIsSpecialCharacter) // retorna true caso ache o caracter que corresponder a pesquisa

        if (verificationSpecialChars !== false) {
            return false;
        }

        return true;

    } catch (error) {
        console.error(error);
        throw new Error(error);

    }
}

module.exports = isSpecialCharacter;
