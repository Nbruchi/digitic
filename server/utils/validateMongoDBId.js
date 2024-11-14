const mongoose = require("mongoose");

const validateMongoDBId = (id) => {
  if (!id) {
    throw new Error("Id is undefined or null");
  }
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) {
    throw new Error(`Id "${id}" isn't valid or not found`);
  }
};

module.exports = validateMongoDBId;
