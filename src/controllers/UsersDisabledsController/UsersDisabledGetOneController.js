const UsersDisabledGetOneService = require('../../services/UsersDisabledServices/UsersDisabledGetOneService');

const userDisabledGetOneController = {
    getOneById: async (req, res) => {
        try {
            const userDisabled = await UsersDisabledGetOneService.getOneById(req.params.id);

            if (!userDisabled.success) {
                return res.status(userDisabled.code).json(userDisabled);
            }

            return res.status(userDisabled.code).json({
                code: userDisabled.code,
                data: userDisabled,
                message: userDisabled.message,
                success: userDisabled.success,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                code: 500,
                error: {
                    details: [
                        {
                            controller: "UserDisabledGetOneController",
                            message: "Erro interno",
                        },
                    ],
                },
                message: "Erro no UserDisabledGetOneController",
                success: false,
            });
        }
    }
}

module.exports = userDisabledGetOneController