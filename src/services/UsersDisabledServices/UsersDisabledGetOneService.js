const UserDisabled = require("../../models/UsersDisableds");

const UsersDisabledGetOneService = {
    getOneById: async (id) => {
        try {
            const userDisabled = await UserDisabled.findByPk(id);

            console.log(userDisabled);


            if (!userDisabled) {
                return {
                    code: 404,
                    error: {
                        details: [
                            {
                                message: "Usuario não encontrado",
                            },
                        ],
                    },
                    message: "Erro ao buscar user por id",
                    success: false,
                };
            }

            return {
                code: 200,
                userDisabled,
                message: "User encontrado com sucesso",
                success: true,
            };
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }
}

module.exports = UsersDisabledGetOneService;