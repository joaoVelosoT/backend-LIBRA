const typesDisabledGetOneService = require('../../services/TypesDisabledServices/TypesDisabledGetOneServices.js')

const typeDisableGetOneController = {

    getOneByName: async (req, res) => {
        try {

            const { name } = req.params;

            const type = await typesDisabledGetOneService.getOneByName(name);

            return res.status(type.code).json(type)

        } catch (error) {
            return res.status(500).json({
                code: 500,
                error: {
                    details: [
                        { controller: "typeDisabledGetOneController", message: "Erro interno" },
                    ],
                },
                message: "Erro no typeDisabledGetOneController",
                sucess: false,
            });
        }


    }

}

module.exports = typeDisableGetOneController;