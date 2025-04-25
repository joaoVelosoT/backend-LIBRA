const BookSearchService = require("../../services/BookServices/BookSearchService.js");

const BookSearchController = async (req, res) => {
    try {

        console.log(req.query);

        const response = await BookSearchService.getByQuery(req.query);

        console.log(response);


        return res.status(200).json({
            code: 200,
            response,
            message: "Livros encontrados com sucesso",
            success: true
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            error: {
                details: [
                    {
                        controller: "BookSearchController",
                        message: "Erro interno",
                    },
                ],
            },
            message: "Erro no BookSearchController",
            success: false,
        });
    }
}

module.exports = BookSearchController;