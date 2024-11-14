const asyncHandler = require("express-async-handler");
const Coupon = require("../models/couponModel");
const validateMongoDBId = require("../utils/validateMongoDBId");

const createCoupon = asyncHandler(async (request, response) => {
  try {
    const coupon = await Coupon.create(request.body);
    response.json(coupon);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllCoupons = asyncHandler(async (request, response) => {
  try {
    const coupons = await Coupon.find();
    response.json(coupons);
  } catch (error) {
    throw new Error(error);
  }
});

const getCoupon = asyncHandler(async (request, response) => {
  const { id } = request.params;
  validateMongoDBId(id);
  try {
    const coupon = await Coupon.findById(id);
    response.json(coupon);
  } catch (error) {
    throw new Error(error);
  }
});

const updateCoupon = asyncHandler(async (request, response) => {
  const { id } = request.params;
  validateMongoDBId(id);
  try {
    const coupon = await Coupon.findByIdAndUpdate(id, request.body, {
      new: true,
    });
    response.json(coupon);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteCoupon = asyncHandler(async (request, response) => {
  const { id } = request.params;
  validateMongoDBId(id);
  try {
    await Coupon.findByIdAndDelete(id);
    response.json({ message: "Coupon deleted!" });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createCoupon,
  getAllCoupons,
  getCoupon,
  updateCoupon,
  deleteCoupon,
};
