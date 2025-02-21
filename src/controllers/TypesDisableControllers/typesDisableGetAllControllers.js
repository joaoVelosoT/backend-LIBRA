const typesDisabledGetAllService = require('../../services/TypesDisabledServices/typesDisableGetAllServices');

const typesDisabledGetAllController = {

    getAll: async (req, res) => {
        try {

            const types = await typesDisabledGetAllService.getAll();

            return res.status(types.code).json(types)

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                code: 500,
                error: {
                    details: [
                        { controller: "typeDisabledGetAllController", message: "Erro interno" },
                    ],
                },
                message: "Erro no typeDisabledGetAllController",
                sucess: false,
            });
        }


    }

}

module.exports = typesDisabledGetAllController;