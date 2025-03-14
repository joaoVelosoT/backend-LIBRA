const { Router } = require("express");
const BookCreateValidator = require("../middlewares/Validators/BooksValidators/BookCreateValidator");
const BookCreateController = require("../controllers/BooksControllers/BookCreateController");
const BookDeleteController = require("../controllers/BooksControllers/BookDeleteController");
const BookGetAllController = require("../controllers/BooksControllers/BookGetAllController");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

router.post(
  "/",
  upload.fields([
    { name: "capa", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  BookCreateValidator,
  BookCreateController
);
router.delete("/:id", BookDeleteController);
router.get("/", BookGetAllController);

module.exports = router;