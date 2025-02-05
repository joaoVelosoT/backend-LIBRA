const { Router } = require("express");
const UserCreateValidator = require("../middlewares/Validators/UserValidators/UserCreateValidator");
const UserCreateController = require("../controllers/UsersControllers/UserCreateController");
const UserGetAllController = require("../controllers/UsersControllers/UserGetAllController");
const ValidatorID = require("../middlewares/Validators/ValidatorID");
const UserGetOneController = require("../controllers/UsersControllers/UserGetOneController");
const router = Router();

// Create user
router.post("/", UserCreateValidator, UserCreateController);

// getAll user
router.get("/", UserGetAllController);

// getOne user
router.get("/:id", ValidatorID, UserGetOneController);

// update user
router.put("/:id");

// delete user
router.delete("/:id");

module.exports = router;
