const typesDisabled = require('../../models/typesDisabled');

const typesDisabledCreateService = {
    create: async (type) => {
        try {

            //getOneByName -> tomar cuidado com a case

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
    }
}

module.exports = typesDisabledCreateService;