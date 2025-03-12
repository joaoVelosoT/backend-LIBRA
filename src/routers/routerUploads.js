const { Router } = require("express");
const router = Router();

const uploadCreateController = require("../controllers/uploadController/uploadCreateController.js");
const uploadgGetAllController = require("../controllers/uploadController/uploadGetAllController.js");
const uploadgDeleteController = require("../controllers/uploadController/uploadDeleteController.js");

router.post("/", uploadCreateController);
router.get("/", uploadgGetAllController);
router.delete("/", uploadgDeleteController);

module.exports = router;