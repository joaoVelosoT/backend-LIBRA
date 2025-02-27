const requestedBook = require("../../models/RequestedBook");

const RequestedBookDeleteService = async (idRequestedBook) => {
    try {
        const RequestedBook = await requestedBook.findByPk(idRequestedBook);

        if (!RequestedBook) {
            return {
                code: 404,
                error: {
                    details: [
                        {
                            message: "Livro não encontrado",
                        },
                    ],
                },
                message: "Erro ao buscar livro por ID",
                success: false,
            };
        }

        await RequestedBook.destroy();
        return {
            code: 200,
            RequestedBook,
            message: "Livro deletado com sucesso",
            success: true,
        };
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
};

module.exports = RequestedBookDeleteService;