const { Router } = require("express");
const router = Router();

const userDisabledGetAllController = require('../controllers/UsersDisabledsController/UsersDisabledGetAllController');

// Create userDisabled
router.post("/");

// GetAll userDisabled
router.get("/");

// GetOne userDisabled
router.get("/", userDisabledGetAllController.getAll);

// Update userDisabled
router.put("/");

// Delete userDisabled
router.delete("/");

module.exports = router;
