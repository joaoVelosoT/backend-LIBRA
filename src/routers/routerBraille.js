const express = require('express');
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const BrailleCreateController = require("../controllers/BrailleController/BrailleCreateController");
const DesbrailleCreateController = require("../controllers/BrailleController/DesbrailleCreateController");
const TranslateBrailleController = require("../controllers/BrailleController/TranslateBrailleController");


router.post('/braille', BrailleCreateController)

router.post('/translate/braille', upload.single('file'), TranslateBrailleController);

router.post('/desbraille', DesbrailleCreateController);

module.exports = router;
