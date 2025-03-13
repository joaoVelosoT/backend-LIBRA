const uploadDeleteService = require("../../services/uploadServices/uploadDeleteService");

const uploadDeleteController = async (req, res) => {
    try {

        const { id } = req.params; // Pega o ID do arquivo a ser deletado

        const result = await uploadDeleteService.delete(id);

        if (result.success) {
            res.json({ message: "Arquivo deletado com sucesso!" });
        } else {
            res.status(result.code).json(result);
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            error: {
                details: [
                    {
                        controller: "UploadDeleteController",
                        message: "Erro interno",
                    },
                ],
            },
            message: "Erro no UploadDeleteController",
            success: false,
        });
    }
}

module.exports = uploadDeleteController;