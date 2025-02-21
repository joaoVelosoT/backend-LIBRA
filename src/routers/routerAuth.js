const { Router } = require("express");

const ForgotPasswordController = require("../controllers/AuthControllers/forgotPasswordUserController")
const ResetPasswordController = require("../controllers/AuthControllers/resetPasswordUserController");
const RegisterUserController = require("../controllers/AuthControllers/registerUserController");
const UserCreateValidator = require("../middlewares/Validators/UserValidators/UserCreateValidator");
const LoginUserController = require("../controllers/AuthControllers/loginUserController");
const LoginValidator = require("../middlewares/Validators/AuthValidators/LoginValidator");
const  AdminLoginValidator = require("../middlewares/Validators/AuthValidators/AdminLoginValidator");
const AdminLoginController = require("../controllers/AuthControllers/AdminLoginController");
const AdminLogoutController = require("../controllers/AuthControllers/AdminLogoutController");
const verifyToken = require("../middlewares/Validators/AuthValidators/verifyToken");



const router = Router();

// Esqueci minha senha (envia o e-mail)
router.post("/forgot-password", ForgotPasswordController);

// Redefinir a senha
router.post("/reset-password/:token", ResetPasswordController);

// User Register
router.post("/register", UserCreateValidator, RegisterUserController);

// User Login
router.post("/login", LoginValidator, LoginUserController);

// Admin Login
router.post("/login-admin", AdminLoginValidator, AdminLoginController);

router.post("/logout-admin", verifyToken, AdminLogoutController);

module.exports = router;
