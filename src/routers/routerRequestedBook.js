const { Router } = require("express");
const RequestedBookCreateValidator = require("../middlewares/Validators/RequestedBookValidators/RequestedBookCreateValidator");
const RequestedBookCreateController = require("../controllers/RequestedBookControllers/RequestedBookCreateController");
const RequestedBookGetAllController = require("../controllers/RequestedBookControllers/RequestedBookGetAllController");
const RequestedBookGetByIdController = require("../controllers/RequestedBookControllers/RequestedBookGetByIdController");
const RequestedBookDeleteController = require("../controllers/RequestedBookControllers/RequestedBookDeleteController");
const ValidatorID = require("../middlewares/Validators/ValidatorID");
const AuthAdmin = require("../utils/isAdmin");



const router = Router();

router.post("/", RequestedBookCreateValidator, RequestedBookCreateController);
router.get('/', RequestedBookGetAllController);
router.get('/:id', ValidatorID, /* AuthAdmin , */ RequestedBookGetByIdController);
router.delete('/:id', ValidatorID, /* AuthAdmin , */ RequestedBookDeleteController);

module.exports = router;