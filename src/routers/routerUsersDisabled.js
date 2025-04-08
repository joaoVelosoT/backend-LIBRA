const { Router } = require("express");
const UsersDisabledCreateController = require("../controllers/UsersDisabledsController/UsersDisabledCreateController");
const UsersDisabledCreateValidator = require("../middlewares/Validators/UsersDisabledValidators/UsersDisabledCreateValidator");
const UserDisabledUpdateValidator = require("../middlewares/Validators/UsersDisabledValidators/usersDisabledUpdateValidator");
const ValidatorID = require("../middlewares/Validators/ValidatorID")
const userDisabledGetAllController = require("../controllers/UsersDisabledsController/UsersDisabledGetAllController");
const userDisabledGetOneController = require("../controllers/UsersDisabledsController/UsersDisabledGetOneController");
const UserDisabledDeleteController = require("../controllers/UsersDisabledsController/UsersDisabledDeleteController");
const UserDisabledUpdateController = require("../controllers/UsersDisabledsController/UsersDisabledUpdateController");
const UserDisabledSearchController = require("../controllers/UsersDisabledsController/UsersDisabledSearchController");
const AuthAdmin = require("../utils/isAdmin");
const router = Router();




// Create userDisabled
router.post("/", AuthAdmin, UsersDisabledCreateValidator, UsersDisabledCreateController);

// GetOne userDisabled
router.get("/:id", AuthAdmin, ValidatorID, userDisabledGetOneController.getOneById);

// GetAll userDisabled
router.get("/", AuthAdmin, userDisabledGetAllController.getAll);

// Update userDisabled
router.patch("/:id", ValidatorID, AuthAdmin, UserDisabledUpdateValidator, UserDisabledUpdateController);;

// Delete userDisabled
router.delete("/:id", ValidatorID, AuthAdmin, UserDisabledDeleteController);

//Rota de buscar tipo e deficiencia
router.get("/:idUser", UserDisabledSearchController);

module.exports = router;
