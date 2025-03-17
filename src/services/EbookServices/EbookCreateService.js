const Ebook = require("../../models/Ebook");

const EbookCreateService = {
    create: async () => {
        try {

            const ebooks = Ebook.create();

        } catch (error) {

        }
    }
}

module.exports = EbookCreateService;