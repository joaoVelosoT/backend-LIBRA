const { Router } = require("express");
const UsersDisabledCreateController = require("../controllers/UsersDisabledsController/UsersDisabledCreateController");
const UsersDisabledCreateValidator = require("../middlewares/Validators/UsersDisabledValidators/UsersDisabledCreateValidator");
const router = Router();

const userDisabledGetAllController = require('../controllers/UsersDisabledsController/UsersDisabledGetAllController');

const UserDisabledDeleteController = require("../controllers/UsersDisabledsController/UsersDisabledDeleteController");

// Create userDisabled
router.post("/", UsersDisabledCreateValidator, UsersDisabledCreateController);

// GetAll userDisabled
router.get("/");

// GetOne userDisabled
router.get("/", userDisabledGetAllController.getAll);

// Update userDisabled
router.put("/");

// Delete userDisabled
router.delete("/:id", UserDisabledDeleteController);

module.exports = router;
