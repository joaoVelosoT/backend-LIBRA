const AudioBook = require('../../models/Audiobook');

const AudioBookGetAllService = {
    getAll: async () => {
        try {
            const audioBooks = await AudioBook.findAll();


            if (audioBooks.length === 0) {
                return {
                    code: 200,
                    data: [],
                    message: "Nenhum audioBook encontrado",
                    success: true,
                };
            }
            return {
                code: 200,
                data: audioBooks,
                message: "Todos os audioBooks encontrados",
                success: true,
            };

        } catch (error) {
            await transaction.rollback();
            console.error(error);
            throw new Error(error.message);
        }
    }
}

module.exports = AudioBookGetAllService;