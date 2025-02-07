const userDisabled = require("../../models/UsersDisableds");

const userDisabledGetAllService = {

    getAll: async () => {
        try {

            const getAllUserDisabled = await userDisabled.findAll();

            if (getAllUserDisabled === null) {
                return {
                    code: 404,
                    data: {
                        getAllUserDisabled
                    },
                    erro: 'Deficiência de usuário não encontrada!',
                    message: 'Não há nenhum usuário com deficiência cadastrado no banco de dados!',
                    success: false
                }
            }

            return {
                code: 200,
                data: {
                    getAllUserDisabled
                },
                message: 'Usuários encontrado com sucesso!',
                success: true
            }

        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

}

module.exports = userDisabledGetAllService;