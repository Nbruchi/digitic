const asyncHandler = require("express-async-handler");
const Enquiry = require("../models/enquiryModel");
const validateMongoDBId = require("../utils/validateMongoDBId");

const createEnquiry = asyncHandler(async (request, response) => {
  try {
    const enquiry = await Enquiry.create(request.body);
    response.json(enquiry);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllEnquirys = asyncHandler(async (request, response) => {
  try {
    const enquirys = await Enquiry.find();
    response.json(enquirys);
  } catch (error) {
    throw new Error(error);
  }
});

const getEnquiry = asyncHandler(async (request, response) => {
  const { id } = request.params;
  validateMongoDBId(id);
  try {
    const enquiry = await Enquiry.findById(id);
    response.json(enquiry);
  } catch (error) {
    throw new Error(error);
  }
});

const updateEnquiry = asyncHandler(async (request, response) => {
  const { id } = request.params;
  validateMongoDBId(id);
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(id, request.body, {
      new: true,
    });
    response.json(enquiry);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteEnquiry = asyncHandler(async (request, response) => {
  const { id } = request.params;
  validateMongoDBId(id);
  try {
    await Enquiry.findByIdAndDelete(id);
    response.json({ message: "Enquiry deleted!" });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createEnquiry,
  getAllEnquirys,
  getEnquiry,
  updateEnquiry,
  deleteEnquiry,
};
