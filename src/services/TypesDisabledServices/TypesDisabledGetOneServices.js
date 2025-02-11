const typesDisabled = require('../../models/typesDisabled');

const typesDisabledGetOneService = {

    getOneByName: async (name) => {
        try {

            const typeOfName = typeof (name);

            console.log(typeOfName);

            var nome;

            if (typeOfName !== 'string') {

                nome = name.name;

            } else {
                nome = name;
            }

            const getOneByNameType = await typesDisabled.findOne({
                where: {
                    name: nome,
                },
            });

            if (getOneByNameType === null) {
                return {
                    code: 404,
                    data: {
                        getOneByNameType
                    },
                    erro: 'Tipo de deficiência não encontrada!',
                    message: 'Busque um tipo de deficiência pelo nome correto.',
                    success: false
                }
            }

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