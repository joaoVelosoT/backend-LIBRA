const { Router } = require("express");

const ForgotPasswordController = require("../controllers/AuthControllers/forgotPasswordUserController")
const ResetPasswordController = require("../controllers/AuthControllers/resetPasswordUserController");
const RegisterUserController = require("../controllers/AuthControllers/AuthUserController/registerUserController");
const UserCreateValidator = require("../middlewares/Validators/UserValidators/UserCreateValidator");
const LoginUserController = require("../controllers/AuthControllers/AuthUserController/loginUserController");
const LoginValidator = require("../middlewares/Validators/AuthValidators/LoginValidator");
const UserLogoutController = require("../controllers/AuthControllers/AuthUserController/UserLogoutController");
const AdminLoginValidator = require("../middlewares/Validators/AuthValidators/AdminLoginValidator");
const AdminLoginController = require("../controllers/AuthControllers/AuthAdminController/AdminLoginController");
const AdminLogoutController = require("../controllers/AuthControllers/AuthAdminController/AdminLogoutController");
const verifyTokenUser = require("../middlewares/Validators/AuthValidators/verifyTokenUser");
const verifyTokenAdmin = require("../middlewares/Validators/AuthValidators/verifyTokenAdmin");



const router = Router();

// Esqueci minha senha (envia o e-mail)
router.post("/forgot-password", ForgotPasswordController);

// Redefinir a senha
router.post("/reset-password/:token", ResetPasswordController);

// User Register
router.post("/register", UserCreateValidator, RegisterUserController);

// User Login
router.post("/login", LoginValidator, LoginUserController);

// User Logout
router.post("/logout-user", verifyTokenUser, UserLogoutController);

// Admin Login
router.post("/login-admin", AdminLoginValidator, AdminLoginController);

// Admin Logout
router.post("/logout-admin", verifyTokenAdmin, AdminLogoutController);

module.exports = router;
