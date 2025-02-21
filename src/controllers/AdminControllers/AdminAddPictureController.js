const AdminAddPictureService = require("../../services/AdminServices/AdminAddPictureService");

const AdminAddPictureController = async (req, res) => {
    try {

        const { id } = req.params;

        const adminPicture = await AdminAddPictureService(req.files, id);

        if (!adminPicture.success) {
            return res.status(adminPicture.code).json(adminPicture);
        }

        return res.status(adminPicture.code).json({
            code: adminPicture.code,
            data: adminPicture.admin,
            message: adminPicture.message,
            success: true,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            code: 500,
            error: {
                details: [
                    {
                        controller: "AdminAddPictureController",
                        message: "Erro interno",
                    },
                ],
            },
            message: "Erro no AdminAddPictureController",
            success: false,
        });
    }

};


module.exports = AdminAddPictureController;