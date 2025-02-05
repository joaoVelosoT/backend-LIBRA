const typesDisabled = require('../../models/typesDisabled');

const typesDisabledService = {
    create: async (type) => {
        try {

            const createdType = await typesDisabled.create(type);
            return {
                code: 201,
                data: {
                    createdType
                },
                message: 'Tipo de deficiência criada com sucesso!',
                success: true
            }

        } catch (error) {
            console.error(error);
            throw new Error(error.message)
        }
    },

    getOneByName: async (name) => {
        try {

            console.log(typeof (name));

            const getOneByNameType = await typesDisabled.findOne({
                where: {
                    name: name,
                },
            });

            console.log(getOneByNameType)

            return {
                code: 200,
                data: {
                    getOneByNameType
                },
                message: 'Tipo de deficiência encontrada com sucesso!',
                success: true
            }

        } catch (error) {
            console.error(error)
            throw new Error(error.message)
        }
    }

}

module.exports = typesDisabledService;