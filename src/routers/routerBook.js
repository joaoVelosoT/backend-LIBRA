  const { Router } = require("express");
  const BookCreateValidator = require("../middlewares/Validators/BooksValidators/BookCreateValidator");
  const BookCreateController = require("../controllers/BooksControllers/BookCreateController");
  const BookDeleteController = require("../controllers/BooksControllers/BookDeleteController");
  const BookGetAllController = require("../controllers/BooksControllers/BookGetAllController");
  const BookUpdateController = require("../controllers/BooksControllers/BookUpdateController");
  const BookGetByIdController = require("../controllers/BooksControllers/BookGetByIdController");

  const multer = require("multer");

  const upload = multer({ storage: multer.memoryStorage() });
  const router = Router();


  router.get("/:id", BookGetByIdController);

  router.post(
    "/",
    upload.fields([
      { name: "capa", maxCount: 1 },
      { name: "banner", maxCount: 1 },
    ]),
    BookCreateValidator,
    BookCreateController
  );

  router.get("/", BookGetAllController);

  router.patch("/:id", upload.fields([
    { name: "capa", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
    BookUpdateController
  );

  router.delete("/:id", BookDeleteController);

  module.exports = router;