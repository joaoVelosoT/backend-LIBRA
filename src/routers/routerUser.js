const { Router } = require("express");
const UserCreateValidator = require("../middlewares/Validators/UserValidators/UserCreateValidator");
const UserCreateController = require("../controllers/UsersControllers/UserCreateController");
const UserGetAllController = require("../controllers/UsersControllers/UserGetAllController");
const ValidatorID = require("../middlewares/Validators/ValidatorID");
const UserGetOneController = require("../controllers/UsersControllers/UserGetOneController");
const UserUpdateController = require("../controllers/UsersControllers/UserUpdateController");
const UserUpdateValidator = require("../middlewares/Validators/UserValidators/UserUpdateValidator");
const UserDeleteController = require("../controllers/UsersControllers/UserDeleteController");
const AuthAdmin = require("../utils/isAdmin"); 
const router = Router();

// Create user
router.post("/", UserCreateValidator, UserCreateController);

// getAll user
router.get("/", AuthAdmin, UserGetAllController);

// getOne user
router.get("/:id", ValidatorID, AuthAdmin, UserGetOneController);

// update user
router.put("/:id", ValidatorID, UserUpdateValidator, UserUpdateController);

// delete user
router.delete("/:id", ValidatorID, AuthAdmin, UserDeleteController );

module.exports = router;
