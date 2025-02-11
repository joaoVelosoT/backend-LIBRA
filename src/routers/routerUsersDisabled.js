const { Router } = require("express");
const UsersDisabledCreateController = require("../controllers/UsersDisabledsController/UsersDisabledCreateController");
const UsersDisabledCreateValidator = require("../middlewares/Validators/UsersDisabledValidators/UsersDisabledCreateValidator");
const UserDisabledUpdateValidator = require("../middlewares/Validators/UsersDisabledValidators/usersDisabledUpdateValidator");
const ValidatorID = require("../middlewares/Validators/ValidatorID")
const userDisabledGetAllController = require("../controllers/UsersDisabledsController/UsersDisabledGetAllController");
const userDisabledGetOneController = require("../controllers/UsersDisabledsController/UsersDisabledGetOneController");
const UserDisabledDeleteController = require("../controllers/UsersDisabledsController/UsersDisabledDeleteController");
const UserDisabledUpdateController = require("../controllers/UsersDisabledsController/UsersDisabledUpdateController");
const router = Router();




// Create userDisabled
router.post("/", UsersDisabledCreateValidator, UsersDisabledCreateController);

// GetOne userDisabled
router.get("/:id", ValidatorID, userDisabledGetOneController.getOneById);

// GetAll userDisabled
router.get("/", userDisabledGetAllController.getAll);

// Update userDisabled
router.patch("/:id", UserDisabledUpdateValidator, UserDisabledUpdateController);;

// Delete userDisabled
router.delete("/:id", UserDisabledDeleteController);

module.exports = router;
