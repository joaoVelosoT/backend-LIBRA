const isNumber = async (verification) => {
    try {

        const character = verification;

        let numbers = /[0-9]/g;

        const verificationNumbers = character.search(numbers); // retorna o index do caracter que corresponder a pesquisa

        if (verificationNumbers !== -1) {
            return false;
        }

        return true;

    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
}

module.exports = isNumber