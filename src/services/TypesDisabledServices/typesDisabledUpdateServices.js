const typesDisable = require("../../models/typesDisabled");

const typeDisabledUpdateService = {

    update: async (name, data) => {
        try {

            const typeDisabledUpdate = await typesDisable.update(data, {
                where: {
                    name: name
                }
            });

            if (typeDisabledUpdate === null) {
                return {
                    code: 404,
                    data: {
                        id: typeDisabledUpdate
                    },
                    erro: 'Tipo de deficiência não encontrada!',
                    message: 'Busque um tipo de deficiência pelo nome correto.',
                    success: false
                }
            }

            return {
                code: 200,
                data: {
                    typeDisabledUpdate
                },
                message: 'Tipo de deficiência alterada com sucesso!',
                success: true
            }


        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

};

module.exports = typeDisabledUpdateService