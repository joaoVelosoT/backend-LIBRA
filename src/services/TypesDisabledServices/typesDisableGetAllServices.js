const typesDisabled = require('../../models/typesDisabled');

const typesDisabledGetAllService = {

    getAll: async () => {
        try {

            const getAllTypes = await typesDisabled.findAll();

            if (getAllTypes === null) {
                return {
                    code: 404,
                    data: {
                        getAllTypes
                    },
                    erro: 'Tipo de deficiência não encontrada!',
                    message: 'Não há nenhum tipo de deficiência cadastrada no banco de dados!',
                    success: false
                }
            }

            return {
                code: 200,
                data: {
                    getAllTypes
                },
                message: 'Tipos de deficiências encontradas com sucesso!',
                success: true
            }

        } catch (error) {
            console.error(error)
            throw new Error(error.message)
        }
    }

}

module.exports = typesDisabledGetAllService;