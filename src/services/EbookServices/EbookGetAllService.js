const Ebook = require('../../models/Ebook');

const EbookGetAllService = {
    getAll: async () => {
        try {
            const Ebooks = await Ebook.findAll();


            if (Ebooks.length === 0) {
                return {
                    code: 200,
                    data: [],
                    message: "Nenhum Ebook encontrado",
                    success: true,
                };
            }
            return {
                code: 200,
                data: Ebooks,
                message: "Todos os Ebooks encontrados",
                success: true,
            };

        } catch (error) {
            await transaction.rollback();
            console.error(error);
            throw new Error(error.message);
        }
    }
}

module.exports = EbookGetAllService;