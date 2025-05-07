const { Router } = require("express");

const ForgotPasswordController = require("../controllers/AuthControllers/AuthUserController/forgotPasswordUserController")
const ResetPasswordController = require("../controllers/AuthControllers/AuthUserController/resetPasswordUserController");
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
const ForgotPasswordAdminController = require("../controllers/AuthControllers/AuthAdminController/forgotPasswordAdminController");
const ResetPasswordAdminController = require("../controllers/AuthControllers/AuthAdminController/resetPasswordAdminController");


const router = Router();

// Esqueci minha senha (envia o e-mail) User
router.post("/forgot-password", ForgotPasswordController);

// Redefinir a senha User
router.post("/reset-password/:token", ResetPasswordController);

// Rota para solicitar email de esqueci a senha 
router.post("/admin/forgot-password", ForgotPasswordAdminController);

// Redefinir a senha (admin)
router.post("/admin/reset-password/:token", ResetPasswordAdminController);

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
