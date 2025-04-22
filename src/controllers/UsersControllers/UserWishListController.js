const UserWishListService = require("../../services/UsersServices/UserWishListService");

const UserWishListController = {
    addBookWishList: async (req, res) => {
        try {
            const { userId, bookId } = req.params;

            const Result = await UserWishListService.addBookWishList(userId, bookId);

            if (!Result.success) {
                return res.status(Result.code).json(Result);
            }

            return res.status(Result.code).json({
                code: Result.code,
                data: Result.data,
                message: Result.message,
                success: true,
            });


        } catch (error) {
            console.error(error);
            return res.status(500).json({
                code: 500,
                error: {
                    details: [
                        {
                            controller: "UserWishListController",
                            message: error.message,
                        },
                    ],
                },
                message: "Erro no UserWishListControllerr",
                success: false,
            });
        }
    }
}

module.exports = UserWishListController;