const { Router } = require("express");
const UserCreateValidator = require("../middlewares/Validators/UserValidators/UserCreateValidator");
const UserCreateController = require("../controllers/UsersControllers/UserCreateController");
const UserGetAllController = require("../controllers/UsersControllers/UserGetAllController");
const ValidatorID = require("../middlewares/Validators/ValidatorID");
const UserGetOneController = require("../controllers/UsersControllers/UserGetOneController");
const UserUpdateController = require("../controllers/UsersControllers/UserUpdateController");
const UserUpdateValidator = require("../middlewares/Validators/UserValidators/UserUpdateValidator");
const UserDeleteController = require("../controllers/UsersControllers/UserDeleteController");
const AuthAdmin = require("../utils/isAdmin");
const UserFavoritesController = require("../controllers/UsersControllers/UserFavoritesController");
const UserRatingValidator = require("../middlewares/Validators/UserValidators/UserRatingValidator");
const UserRatingController = require("../controllers/UsersControllers/UserRatingController");
const UserLidosController = require("../controllers/UsersControllers/UserLidosController")

const router = Router();

// Rotas básicas de usuário
router.post("/", UserCreateValidator, UserCreateController);
router.get("/", UserGetAllController);
router.get("/:id", ValidatorID, UserGetOneController);
router.put("/:id", ValidatorID, UserUpdateValidator, UserUpdateController);
router.delete("/:id", ValidatorID, AuthAdmin, UserDeleteController);

// Rotas de favoritos
router.post('/:id/favorites', ValidatorID, UserFavoritesController.addFavorite);
router.delete('/:id/favorites', ValidatorID, UserFavoritesController.removeFavorite);
router.get('/:id/favorites', ValidatorID, UserFavoritesController.getFavorites);

router.post("/:id/read", ValidatorID, UserLidosController.addRead)
router.delete("/:id/read", ValidatorID, UserLidosController.removeRead)

// Rota de avaliação
router.post('/:userId/rate/:bookId', ValidatorID, UserRatingValidator, UserRatingController);

module.exports = router;