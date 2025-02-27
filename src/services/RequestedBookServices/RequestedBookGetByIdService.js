const requestedBook = require("../../models/RequestedBook");

const RequestedBookGetByIdService = async (id) => {
    try {
        const RequestedBook = await requestedBook.findByPk(id);

        if (!RequestedBook) {
            return {
                code: 404,
                data: null,
                message: "Livro não encontrado",
                success: false,
            };
        }

        return {
            code: 200,
            data: RequestedBook,
            message: "Livro encontrado com sucesso",
            success: true,
        };
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
};

module.exports = RequestedBookGetByIdService;