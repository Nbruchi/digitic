const BlogCategory = require("../models/blogCategoryModel");
const asyncHandler = require("express-async-handler");
const validateMongoDBId = require("../utils/validateMongoDBId");

const createBlogCategory = asyncHandler(async (request, response) => {
  try {
    const blogCategory = await BlogCategory.create(request.body);
    response.json(blogCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllBlogCategories = asyncHandler(async (request, response) => {
  try {
    const blogCategories = await BlogCategory.find();
    response.json(blogCategories);
  } catch (error) {
    throw new Error(error);
  }
});

const getBlogCategory = asyncHandler(async (request, response) => {
  const { id } = request.params;
  validateMongoDBId(id);
  try {
    const blogCategory = await BlogCategory.findById(id);
    response.json(blogCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const updateBlogCategory = asyncHandler(async (request, response) => {
  const { id } = request.params;
  validateMongoDBId(id);
  try {
    const blogCategory = await BlogCategory.findByIdAndUpdate(
      id,
      request.body,
      { new: true }
    );
    response.json(blogCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteBlogCategory = asyncHandler(async (request, response) => {
  const { id } = request.params;
  validateMongoDBId(id);
  try {
    await BlogCategory.findByIdAndDelete(id);
    response.json({ message: `Blog category deleted!` });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createBlogCategory,
  getAllBlogCategories,
  getBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
};
