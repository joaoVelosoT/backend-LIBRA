const typesDisabledService = require('../../services/TypesDisabledServices/TypesDisabledServices.js')

const typeDisableController = {

    create: async (req, res) => {

        try {

            const type = await typesDisabledService.create(req.body);

            return res.status(201).json(type)

        } catch (error) {
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

    },

    getOneByName: async (req, res) => {
        try {

            const { name } = req.params;

            console.log(name);


            const type = await typesDisabledService.getOneByName(name);

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


    },

    getAll: async (req, res) => {

    },

    update: async (req, res) => {

    },

    delete: async (req, res) => {

    }

}

module.exports = typeDisableController;