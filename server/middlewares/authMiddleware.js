const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authMiddleware = asyncHandler(async (request, response, next) => {
  let token;

  if (request.headers?.authorization?.startsWith("Bearer")) {
    token = request.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        request.user = await User.findById(decoded.id).select("-password"); // Find user and exclude the password field
        next();
      }
    } catch (error) {
      response.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    response.status(401);
    throw new Error("No token, authorization denied");
  }
});

const isAdmin = asyncHandler(async (request, response, next) => {
  if (!request.user) {
    response.status(401);
    throw new Error("Not authorized, no user");
  }

  const { email } = request.user;
  const adminUser = await User.findOne({ email });

  if (adminUser && adminUser.role === "admin") {
    next();
  } else {
    response.status(403);
    throw new Error("You are not authorized as an admin");
  }
});

module.exports = { authMiddleware, isAdmin };
