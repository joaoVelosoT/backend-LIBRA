const uploadCreateService = require("../../services/uploadServices/uploadCreateService.js");

const uploadCreateController = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "Nenhum arquivo enviado." });
        }

        const { url } = req.body
        console.log(req.file);

        console.log(url);

        const { originalname, buffer, mimetype } = req.file;

        const result = await uploadCreateService.create(originalname, buffer, mimetype, url);

        if (result.success) {
            res.json({ message: "Upload bem-sucedido!", fileUrl: result.fileUrl });
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
                        controller: "UploadCreateController",
                        message: "Erro interno",
                    },
                ],
            },
            message: "Erro no UploadCreateController",
            success: false,
        });
    }
};

module.exports = uploadCreateController;