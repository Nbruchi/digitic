const Brand = require("../models/brandModel");
const asyncHandler = require("express-async-handler");
const validateMongoDBId = require("../utils/validateMongoDBId");

const createBrand = asyncHandler(async (request, response) => {
  try {
    const brand = await Brand.create(request.body);
    response.json(brand);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllBrands = asyncHandler(async (request, response) => {
  try {
    const brands = await Brand.find();
    response.json(brands);
  } catch (error) {
    throw new Error(error);
  }
});

const getBrand = asyncHandler(async (request, response) => {
  const { id } = request.params;
  validateMongoDBId(id);
  try {
    const brand = await Brand.findById(id);
    response.json(brand);
  } catch (error) {
    throw new Error(error);
  }
});

const updateBrand = asyncHandler(async (request, response) => {
  const { id } = request.params;
  validateMongoDBId(id);
  try {
    const brand = await Brand.findByIdAndUpdate(id, request.body, {
      new: true,
    });
    response.json(brand);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteBrand = asyncHandler(async (request, response) => {
  const { id } = request.params;
  validateMongoDBId(id);
  try {
    await Brand.findByIdAndDelete(id);
    response.json({ message: `Brand deleted!` });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createBrand,
  getAllBrands,
  getBrand,
  updateBrand,
  deleteBrand,
};
