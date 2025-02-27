const RequestedBook = require("../../models/RequestedBook");

const RequestedBookCreateService = async (data) => {
    try {
        const existingRequestedBook = await RequestedBook.findOne({
            where: { title: data.title },
        });

        if (existingRequestedBook) {
            return {
                code: 409,
                error: {
                    details: [
                        {
                            field: "title",
                            message: "Livro com o mesmo título já cadastrado no banco de dados",
                        },
                    ],
                },
                message: "Erro ao validar RequestedBookCreate",
                success: false,
            };
        }

        const newRequestedBook = await RequestedBook.create(data);

        return {
            code: 201,
            data: newRequestedBook,
            message: "Livro cadastrado com sucesso",
            success: true,
        };
    } catch (error) {
        console.error(error);
        return {
            code: 500,
            error: {
                details: [
                    {
                        service: "RequestedBookCreateService",
                        message: "Erro interno ao cadastrar livro",
                    },
                ],
            },
            message: "Erro ao cadastrar livro",
            success: false,
        };
    }
};

module.exports = RequestedBookCreateService;