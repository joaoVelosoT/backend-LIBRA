const { Router } = require("express");
const router = Router();

const disabledController = require('../controllers/disabledController');
const validateDisabledMiddleware = require('../middlewares/validator/disabledValidator');

router.get('/', disabledController.getAll);
router.post('/', validateDisabledMiddleware, disabledController.create);

module.exports = router; 