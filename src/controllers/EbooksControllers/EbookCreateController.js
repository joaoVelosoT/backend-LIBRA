const EbookCreateService = require("../../services/EbookServices/EbookCreateService.js");

const EbookCreateController = async (req, res) => {
    try {

        

    } catch (error) {
        console.error(error);
        return res.status(500).json({
          code: 500,
          error: {
            details: [
              {
                controller: "EbookCreateController",
                message: "Erro interno",
              },
            ],
          },
          message: "Erro no EbookCreateController",
          success: false,
        });
    }
}

module.exports = EbookCreateController;