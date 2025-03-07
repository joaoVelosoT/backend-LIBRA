const requestedBook = require("../../models/RequestedBook");

const RequestedBookGetAllService = async () => {
    try {
        const RequestedBooks = await requestedBook.findAll();

        if (RequestedBooks.length === 0) {
            return {
                code: 404,
                data: RequestedBooks,
                message: "Nenhum livro encontrado",
                success: true,
            };
        }

        return {
            code: 200,
            data: RequestedBooks,
            message: "Lista de livros obtida com sucesso",
            success: true,
        };
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
};

module.exports = RequestedBookGetAllService;