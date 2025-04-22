const UserLidosService = require("../../services/UsersServices/UserLidosService");

const UserLidosController = {

    addRead: async (req, res) => {
        try {
            const { id } = req.params; // ID do usuário
            const { bookId } = req.body;

            if (!bookId) {
                return res.status(400).json({
                    code: 400,
                    message: "O ID do livro é obrigatório",
                    success: false,
                });
            }

            const result = await UserLidosService.addRead(id, bookId);
            return res.status(result.code).json(result);

        } catch (error) {
            console.error("Erro no UserLidosController (add):", error);
            return res.status(500).json({
                code: 500,
                message: "Erro interno ao adicionar livro na lista de lidos.",
                error: error.message,
                success: false,
            });
        }
    },
    removeRead: async (req, res) => {
        try {
            const { id } = req.params; // ID do usuário
            const { bookId } = req.body;

            if (!bookId) {
                return res.status(400).json({
                    code: 400,
                    message: "O ID do livro é obrigatório",
                    success: false,
                });
            }


            const result = await UserLidosService.removeRead(id, bookId);
            return res.status(result.code).json(result);
        } catch (error) {
            console.error("Erro no UserLidosController (remove):", error);
            return res.status(500).json({
                code: 500,
                message: "Erro interno ao remover livro na lista de lidos.",
                error: error.message,
                success: false,
            });
        }
    }
}

module.exports = UserLidosController;