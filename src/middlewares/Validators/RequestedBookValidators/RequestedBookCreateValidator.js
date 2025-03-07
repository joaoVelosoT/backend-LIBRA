const RequestedBookCreateValidator = async (req, res, next) => {
    try {
        const { title, author, gender } = req.body;
        const errors = [];

        if (!title || typeof title !== "string" || title.trim() === "" || title.length > 50) {
            errors.push({
                field: "title",
                message: "O título é obrigatório e deve ter no máximo 50 caracteres.",
            });
        }

        if (!author || typeof author !== "string" || author.trim() === "" || author.length > 150) {
            errors.push({
                field: "author",
                message: "A descrição é obrigatória e deve ter no máximo 150 caracteres.",
            });
        }

        if (!gender || typeof gender !== "string" || gender.trim() === "" || gender.length > 20) {
            errors.push({
                field: "gender",
                message: "O gênero é obrigatório e deve ter no máximo 20 caracteres.",
            });
        }

        if (errors.length !== 0) {
            return res.status(400).json({
                code: 400,
                errors,
                message: "Erro ao validar livro",
                success: false,
            });
        }

        req.RequestedBookData = { title, author, gender };
        return next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            code: 500,
            error: {
                details: [
                    {
                        validator: "RequestedBookCreateValidator",
                        message: "Erro interno",
                    },
                ],
            },
            message: "Erro no RequestedBookCreateValidator",
            success: false,
        });
    }
};

module.exports = RequestedBookCreateValidator;