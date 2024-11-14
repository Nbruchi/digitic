const express = require("express");
const {
  createProductCategory,
  updateProductCategory,
  getAllProductCategories,
  deleteProductCategory,
  getProductCategory,
} = require("../controllers/productCategoryController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createProductCategory);
router.get("/", getAllProductCategories);

router.get("/:id", getProductCategory);
router.put("/:id", authMiddleware, isAdmin, updateProductCategory);
router.delete("/:id", authMiddleware, deleteProductCategory);

module.exports = router;
