const EbookUpdateService = require("../../services/EbookServices/EbookUpdateService");

const EbookUpdateController = async (req, res) => {
    try {
        const { id } = req.params;
        const id_arquivo = req.body;
        const files = req.files;

        // Chama o serviço de atualização
        const updatedEbook = await EbookUpdateService(id, id_arquivo, files);

        if (!updatedEbook.success) {
            return res.status(updatedEbook.code).json(updatedEbook);
        }

        return res.status(updatedEbook.code).json({
            code: updatedEbook.code,
            data: updatedEbook.ebook,
            message: updatedEbook.message,
            success: true,
        });
    } catch (error) {
        return res.status(500).json({
            code: 500,
            error: {
                details: [
                    {
                        controller: "EbookUpdateController",
                        message: "Erro interno no servidor",
                    },
                ],
            },
            message: "Erro no EbookUpdateController",
            success: false,
        });
    }
};

module.exports = EbookUpdateController;