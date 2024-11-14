const ProductCategory = require("../models/productCategoryModel");
const asyncHandler = require("express-async-handler");
const validateMongoDBId = require("../utils/validateMongoDBId");

const createProductCategory = asyncHandler(async (request, response) => {
  try {
    const category = await ProductCategory.create(request.body);
    response.json(category);
  } catch (error) {
    throw new Error(error);
  }
});

const updateProductCategory = asyncHandler(async (request, response) => {
  const { id } = request.params;
  validateMongoDBId(id);
  try {
    const category = await ProductCategory.findByIdAndUpdate(id, request.body, {
      new: true,
    });
    response.json(category);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllProductCategories = asyncHandler(async (request, response) => {
  try {
    const productCategories = await ProductCategory.find();
    response.json(productCategories);
  } catch (error) {
    throw new Error(error);
  }
});

const getProductCategory = asyncHandler(async (request, response) => {
  const { id } = request.params;
  validateMongoDBId(id);
  try {
    const productCategory = await ProductCategory.findById(id);
    response.json(productCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteProductCategory = asyncHandler(async (request, response) => {
  const { id } = request.params;
  try {
    await ProductCategory.findByIdAndDelete(id);
    response.json({ message: `Product category deleted` });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createProductCategory,
  updateProductCategory,
  getAllProductCategories,
  getProductCategory,
  deleteProductCategory,
};
