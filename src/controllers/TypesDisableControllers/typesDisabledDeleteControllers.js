const typesDisabledDeleteService = require("../../services/TypesDisabledServices/typesDisabledDeleteServices");

const typeDisabledDeleteController = {

    delete: async (req, res) => {
        try {

            const { name } = req.params

            const type = await typesDisabledDeleteService.delete(name);

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

module.exports = typeDisabledDeleteController;