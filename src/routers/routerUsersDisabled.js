const { Router } = require("express");
const router = Router();

const UserDisabledDeleteController = require("../controllers/UsersDisabledsController/UsersDisabledDeleteController");


// Create userDisabled
router.post("/");

// GetAll userDisabled
router.get("/");

// GetOne userDisabled
router.get("/");

// Update userDisabled
router.put("/");

// Delete userDisabled
router.delete("/:id", UserDisabledDeleteController);

module.exports = router;
