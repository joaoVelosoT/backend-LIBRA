const EbookGetAllService = require("../../services/EbookServices/EbookGetAllService");

const EbookGetAllController = async (req, res) => {
    try {

        const result = await EbookGetAllService.getAll();

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
                        controller: "EbookGetAllController",
                        message: "Erro interno",
                    },
                ],
            },
            message: "Erro no EbookGetAllController",
            success: false,
        });
    }
}

module.exports = EbookGetAllController;
