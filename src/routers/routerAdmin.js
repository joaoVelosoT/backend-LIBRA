const { Router } = require("express");
const router = Router();

// Create Admin 
router.post("/");

// getAll Admin
router.get("/");

// getOne Admin
router.get("/:id");

// update Admin
router.put("/:id");

// delete Admin
router.delete("/:id");

module.exports = router;
