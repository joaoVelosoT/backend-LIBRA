const userDisabledGetAllService = require("../../services/UsersDisabledServices/UsersDisabledGetAllService");

const userDisabledGetAllController = {
    getAll: async (req, res) => {
        try {

            const userDisabled = await userDisabledGetAllService.getAll();

            return res.status(userDisabled.code).json(userDisabled);

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                code: 500,
                error: {
                    details: [
                        { controller: "userDisabledGetAllController", message: "Erro interno" },
                    ],
                },
                message: "Erro no userDisabledGetAllController",
                sucess: false,
            });
        }
    }
};

module.exports = userDisabledGetAllController;