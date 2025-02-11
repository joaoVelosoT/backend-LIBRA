const typesDisabledCreateService = require('../../services/TypesDisabledServices/typesDisabledCreateServices');
const nameExists = require('../../services/TypesDisabledServices/nameExists');

const typeDisableCreateController = {

    create: async (req, res) => {

        try {

            const nameValid = await nameExists.validNameExists(req.body);

            if (nameValid) {
                const data = {
                    code: 400,
                    erro: "Tipo de deficiência já existe!",
                    message: "O mesmo tipo de deficiência não pode ser criado duas vezes!",
                    success: false,
                }

                return res.status(400).json(data)
            }

            const type = await typesDisabledCreateService.create(req.body);

            return res.status(201).json(type)

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                code: 500,
                error: {
                    details: [
                        { controller: "typeDisabledCreateController", message: "Erro interno" },
                    ],
                },
                message: "Erro no typeDisabledCreateController",
                sucess: false,
            });
        }

    }

}

module.exports = typeDisableCreateController;