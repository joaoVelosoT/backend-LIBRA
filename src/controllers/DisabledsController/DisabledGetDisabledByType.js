const DisabledGetByTypeService = require('../../services/DisabledServices/DisabledGetByTypeService')

const DisabledGetByTypeController = async (req, res) => {
    try {

        const { id } = req.params;
        const response = await DisabledGetByTypeService(id);
        return res.status(response.code).json(response);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            code: 500,
            error: {
                details: [
                    {
                        controller: "DisabledGetByTypeController",
                        message: "Erro interno",
                    },
                ],
            },
            message: "Erro no DisabledGetByTypeController",
            success: false,
        });
    }
}


module.exports = DisabledGetByTypeController;