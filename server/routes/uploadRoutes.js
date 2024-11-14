const express = require("express");
const {
  uploadPhoto,
  productImageResize,
} = require("../middlewares/uploadImages");
const {
  uploadImages,
  deleteImages,
} = require("../controllers/uploadController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post(
  "/",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  productImageResize,
  uploadImages
);

router.delete("/", authMiddleware, isAdmin, deleteImages);

module.exports = router;
