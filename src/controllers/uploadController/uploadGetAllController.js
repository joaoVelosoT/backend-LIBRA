const uploadGetAllService = require('../../services/uploadServices/uploadGetAllService.js');

const uploadGetAllController = async (req, res) => {
    try {

        const arquivos = await uploadGetAllService.getAll();

        res.json({
            code: 200,
            arquivos: arquivos,
            success: true
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            error: {
                details: [
                    {
                        controller: "UploadGetAllController",
                        message: "Erro interno",
                    },
                ],
            },
            message: "Erro no UploadGetAllController",
            success: false,
        });
    }
}


module.exports = uploadGetAllController;