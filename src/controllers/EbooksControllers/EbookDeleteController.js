const EbookDeleteService = require("../../services/EbookServices/EbookDeleteService");

const EbookDeleteController = async (req, res) => {
    try {
        const { id } = req.params; // Pega o ID do audiobook a ser deletado

        const result = await EbookDeleteService.delete(id);

        if (result.success) {
            res.status(result.code).json({
                message: result.message,
                data: result.ebook,
                success: true,
            });
        } else {
            res.status(result.code).json(result);
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            code: 500,
            error: {
                details: [
                    {
                        controller: "EbookDeleteController",
                        message: "Erro interno",
                    },
                ],
            },
            message: "Erro no EbookDeleteController",
            success: false,
        });
    }
}

module.exports = EbookDeleteController;