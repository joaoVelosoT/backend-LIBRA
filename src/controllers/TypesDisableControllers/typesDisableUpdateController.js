const typeDisabledUpdateService = require("../../services/TypesDisabledServices/typesDisabledUpdateServices");
const nameExists = require('../../services/TypesDisabledServices/nameExists');

const typeDisabledUpdateController = {

    update: async (req, res) => {
        try {

            const { name } = req.params;

            const nameValid = await nameExists.validNameExists(name);

            if (!nameValid) {
                const data = {
                    code: 400,
                    erro: "Tipo de deficiência não encontrada!",
                    message: "Busque um tipo de deficiência pelo nome correto.",
                    success: false,
                }

                return res.status(400).json(data)
            }

            const data = req.body;

            const updateType = await typeDisabledUpdateService.update(name, data);

            return res.status(updateType.code).json(updateType);

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                code: 500,
                error: {
                    details: [
                        { controller: "typeDisabledUpdateController", message: "Erro interno" },
                    ],
                },
                message: "Erro no typeDisabledUpdateController",
                sucess: false,
            });
        }
    }

}

module.exports = typeDisabledUpdateController;