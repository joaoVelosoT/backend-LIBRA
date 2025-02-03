const { Router } = require("express");
const router = Router();

// Create user
router.post("/");

// getAll user
router.get("/");

// getOne user
router.get("/:id");

// update user
router.put("/:id");

// delete user
router.delete("/:id");

module.exports = router;
