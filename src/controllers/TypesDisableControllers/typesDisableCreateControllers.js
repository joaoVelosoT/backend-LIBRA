const typesDisabledCreateService = require('../../services/TypesDisabledServices/typesDisabledCreateServices');

const typeDisableCreateController = {

    create: async (req, res) => {

        try {

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