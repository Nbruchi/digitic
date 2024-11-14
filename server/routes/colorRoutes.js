const express = require("express");
const {
  createColor,
  getAllColors,
  getColor,
  updateColor,
  deleteColor,
} = require("../controllers/colorController");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, isAdmin, createColor);
router.get("/", getAllColors);
router.get("/:id", authMiddleware, isAdmin, getColor);
router.put("/:id", authMiddleware, isAdmin, updateColor);
router.delete("/:id", authMiddleware, isAdmin, deleteColor);

module.exports = router;
