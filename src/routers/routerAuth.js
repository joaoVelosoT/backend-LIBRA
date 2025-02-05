const { Router } = require("express");
const RegisterUserController = require("../controllers/AuthControllers/registerUserController");
const UserCreateValidator = require("../middlewares/Validators/UserValidators/UserCreateValidator");
const LoginUserController = require("../controllers/AuthControllers/loginUserController");
const router = Router();

// User Register
router.post("/register", UserCreateValidator, RegisterUserController);

// User Login
router.post("/login", LoginUserController);

module.exports = router;
