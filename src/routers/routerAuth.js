const { Router } = require("express");
const RegisterUserController = require("../controllers/AuthControllers/registerUserController");
const UserCreateValidator = require("../middlewares/Validators/UserValidators/UserCreateValidator");
const router = Router();

// User Register
router.post("/register", UserCreateValidator, RegisterUserController);

module.exports = router;
