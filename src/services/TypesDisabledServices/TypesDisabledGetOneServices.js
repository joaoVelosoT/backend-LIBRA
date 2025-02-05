const typesDisabled = require('../../models/typesDisabled');

const typesDisabledGetOneService = {

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

module.exports = typesDisabledGetOneService;