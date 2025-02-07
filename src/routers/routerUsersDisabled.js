const { Router } = require("express");
const UsersDisabledCreateController = require("../controllers/UsersDisabledsController/UsersDisabledCreateController");
const UsersDisabledCreateValidator = require("../middlewares/Validators/UsersDisabledValidators/UsersDisabledCreateValidator");
const router = Router();

// Create userDisabled
router.post("/", UsersDisabledCreateValidator, UsersDisabledCreateController);

// GetAll userDisabled
router.get("/");

// GetOne userDisabled
router.get("/");

// Update userDisabled
router.put("/");

// Delete userDisabled
router.delete("/");

module.exports = router;
