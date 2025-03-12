const uploadCreateService = require("../../services/uploadServices/uploadCreateService.js");

const uploadCreateController = async (req, res) => {
    try {

        const upload = uploadCreateService.create();

    } catch (error) {
        console.error(error);
        return res.status(500).json({
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
}


module.exports = uploadCreateController;