const asyncHandler = require("express-async-handler");
const Color = require("../models/colorModel");
const validateMongoDBId = require("../utils/validateMongoDBId");

const createColor = asyncHandler(async (request, response) => {
  try {
    const color = await Color.create(request.body);
    response.json(color);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllColors = asyncHandler(async (request, response) => {
  try {
    const colors = await Color.find();
    response.json(colors);
  } catch (error) {
    throw new Error(error);
  }
});

const getColor = asyncHandler(async (request, response) => {
  const { id } = request.params;
  validateMongoDBId(id);
  try {
    const color = await Color.findById(id);
    response.json(color);
  } catch (error) {
    throw new Error(error);
  }
});

const updateColor = asyncHandler(async (request, response) => {
  const { id } = request.params;
  validateMongoDBId(id);
  try {
    const color = await Color.findByIdAndUpdate(id, request.body, {
      new: true,
    });
    response.json(color);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteColor = asyncHandler(async (request, response) => {
  const { id } = request.params;
  validateMongoDBId(id);
  try {
    await Color.findByIdAndDelete(id);
    response.json({ message: "Color deleted!" });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createColor,
  getAllColors,
  getColor,
  updateColor,
  deleteColor,
};
