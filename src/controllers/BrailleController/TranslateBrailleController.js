const TranslateBrailleService = require("../../services/BrailleService/TranslateBrailleService");
const Book = require("../../models/Book");

const TranslateBrailleController = async (file, idLivro) => {
    try {

        if (!file) return { error: "Arquivo é obrigatório!" };

        const book = await Book.findByPk(idLivro);
        if (!book) {
            return res.status(404).json({ error: "Livro não encontrado!" });
        }

        const nomeLivro = `livros/${book.dataValues.titulo.replace(/\s+/g, "_")}`;

        const result = await TranslateBrailleService.translate(file, nomeLivro);

        if (!result.success) {
            throw new Error("Erro na conversão para Braille!")
        }

        
        await book.update({ id_braille: result.braille.id });

        return {
            code: 201,
            data: {
                book,
                braille: result.braille,
            },
            message: "Arquivo convertido e enviado com sucesso!",
            success: true,
        };
    } catch (error) {
        console.error(error);
        return {
            error: "Erro interno",
            details: error.message,
            success: false,
        };
    }
};

module.exports = TranslateBrailleController;
