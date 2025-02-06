const validatorNameTypeDisabled = async (req, res, next) => {
    try {

        const { name } = req.body

        var errorMessage = {
            message: "Erro na validação de nome, tipo de deficiência."
        };

        let numbers = /[0-9]/g;
        let specialChars = /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/;

        const verificationNumbers = name.search(numbers); // retorna o index do caracter que corresponder a pesquisa
        const verificationSpecialChars = specialChars.test(name) // retorna true caso ache o caracter que corresponder a pesquisa

        if (name === "") {
            errorMessage.details = "Nome não pode ser vazio"
            return res.status(500).json({
                code: 500,
                error: {
                    details: [
                        { errorMessage },
                    ],
                },
                message: "Erro no typeDisabledCreateController",
                sucess: false,
            });
        }

        if (verificationNumbers !== -1) {
            errorMessage.details = "Nome não pode ter números"
            return res.status(500).json({
                code: 500,
                error: {
                    details: [
                        { errorMessage },
                    ],
                },
                message: "Erro no typeDisabledCreateController",
                sucess: false,
            });
        }

        if (verificationSpecialChars !== false) {
            errorMessage.details = "Nome não pode ter caracteres especiais"
            return res.status(500).json({
                code: 500,
                error: {
                    details: [
                        { errorMessage },
                    ],
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

}

module.exports = validatorNameTypeDisabled;