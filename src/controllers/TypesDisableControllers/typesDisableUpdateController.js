const typeDisabledUpdateService = require("../../services/TypesDisabledServices/typesDisabledUpdateServices");

const typeDisabledUpdateController = {

    update: async (req, res) => {
        try {

            const { name } = req.params;

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