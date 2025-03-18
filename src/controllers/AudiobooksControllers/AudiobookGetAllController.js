const AudiobookGetAllService = require("../../services/AudioBookServices/AudioBookGetAllService");


const AudiobookGetAllController = async (req, res) => {
    try {

        const result = await AudiobookGetAllService.getAll();

        if (!result.success) {
            return res.status(result.code).json(result);
        }
        return res.status(result.code).json({
            code: result.code,
            data: result.data,
            message: result.message,
            success: result.success,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            code: 500,
            error: {
                details: [
                    {
                        controller: "audioBookGetAllController",
                        message: "Erro interno",
                    },
                ],
            },
            message: "Erro no audioBookGetAllController",
            success: false,
        });
    }
}

module.exports = AudiobookGetAllController;
