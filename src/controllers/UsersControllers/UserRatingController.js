const UserRatingService = require("../../services/UsersServices/UserRatingService");

const UserRatingController = async (req, res) => {
  try {
    const { userId, bookId } = req.params;
    const { nota } = req.ratingData;

    const ratingResult = await UserRatingService.rateBook(userId, bookId, nota);

    if (!ratingResult.success) {
      return res.status(ratingResult.code).json(ratingResult);
    }

    return res.status(ratingResult.code).json({
      code: ratingResult.code,
      data: ratingResult.data,
      message: ratingResult.message,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      error: {
        details: [
          {
            controller: "UserRatingController",
            message: error.message,
          },
        ],
      },
      message: "Erro no UserRatingController",
      success: false,
    });
  }
};

module.exports = UserRatingController;