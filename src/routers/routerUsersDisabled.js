const { Router } = require("express");
const UsersDisabledCreateController = require("../controllers/UsersDisabledsController/UsersDisabledCreateController");
const UsersDisabledCreateValidator = require("../middlewares/Validators/UsersDisabledValidators/UsersDisabledCreateValidator");
const UserDisabledUpdateValidator = require("../middlewares/Validators/UsersDisabledValidators/usersDisabledUpdateValidator");
const UserDisabledUpdateController = require("../controllers/UsersDisabledsController/UsersDisabledUpdateController");
const UserDisabledDeleteController = require("../controllers/UsersDisabledsController/UsersDisabledDeleteController");
const userDisabledGetAllController = require("../controllers/UsersDisabledsController/UsersDisabledGetAllController");

const router = Router();



// Create userDisabled
router.post("/", UsersDisabledCreateValidator, UsersDisabledCreateController);

// GetAll userDisabled
router.get("/");

// GetOne userDisabled
router.get("/", userDisabledGetAllController.getAll);

// Update userDisabled
router.put("/:id", UserDisabledUpdateValidator, UserDisabledUpdateController);;

// Delete userDisabled
router.delete("/:id", UserDisabledDeleteController);

module.exports = router;
