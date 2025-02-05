const typesDisabledGetOneService = require('../../services/TypesDisabledServices/TypesDisabledGetOneServices.js')

const typeDisableGetOneController = {

    getOneByName: async (req, res) => {
        try {

            const { name } = req.params;

            console.log(name);


            const type = await typesDisabledGetOneService.getOneByName(name);

            return res.status(200).json(type)

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