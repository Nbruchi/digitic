const express = require("express");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const {
  createBlogCategory,
  getAllBlogCategories,
  getBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
} = require("../controllers/blogCategoryController");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createBlogCategory);
router.get("/", getAllBlogCategories);

router.get("/:id", getBlogCategory);
router.put("/:id", authMiddleware, isAdmin, updateBlogCategory);
router.delete("/:id", authMiddleware, isAdmin, deleteBlogCategory);

module.exports = router;
