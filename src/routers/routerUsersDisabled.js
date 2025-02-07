const { Router } = require("express");
const UsersDisabledCreateController = require("../controllers/UsersDisabledsController/UsersDisabledCreateController");
const UsersDisabledCreateValidator = require("../middlewares/Validators/UsersDisabledValidators/UsersDisabledCreateValidator");
const userDisabledGetAllController = require("../controllers/UsersDisabledsController/UsersDisabledGetAllController");
const userDisabledGetOneController = require("../controllers/UsersDisabledsController/UsersDisabledGetOneController")
const UserDisabledDeleteController = require("../controllers/UsersDisabledsController/UsersDisabledDeleteController");
const router = Router();




// Create userDisabled
router.post("/", UsersDisabledCreateValidator, UsersDisabledCreateController);

// GetOne userDisabled
router.get("/:id", userDisabledGetOneController.getOneById);

// GetAll userDisabled
router.get("/", userDisabledGetAllController.getAll);

// Update userDisabled
router.put("/");

// Delete userDisabled
router.delete("/:id", UserDisabledDeleteController);

module.exports = router;
