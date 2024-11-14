const fs = require("fs");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

const {
  cloudinaryUploadImage,
  cloudinaryDeleteImage,
} = require("../utils/cloudinary");

const uploadImages = asyncHandler(async (req, res) => {
  try {
    const { entity, entityId } = req.body; // Extract entity type and ID from the form data

    if (!entity || !entityId) {
      return res
        .status(400)
        .json({ message: "Entity type and ID are required" });
    }

    const uploader = (path) => cloudinaryUploadImage(path);
    const urls = [];
    const files = req.files;

    for (const file of files) {
      const { path } = file;
      const { public_id, url } = await uploader(path);
      urls.push({ public_id, url });
    }

    // Dynamically update the entity with the new image URLs
    const updatedEntity = await mongoose
      .model(entity)
      .findByIdAndUpdate(
        entityId,
        { $push: { images: { $each: urls } } },
        { new: true }
      );

    if (!updatedEntity) {
      return res.status(404).json({ message: `${entity} not found` });
    }

    res.json(updatedEntity);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteImages = asyncHandler(async (req, res) => {
  const { entity, entityId, imageId } = req.body; // Extract entity type, ID, and image ID from the form data

  if (!entity || !entityId || !imageId) {
    return res
      .status(400)
      .json({ message: "Entity type, ID, and image ID are required" });
  }

  try {
    await cloudinaryDeleteImage(imageId);

    // Dynamically update the entity to remove the image
    const updatedEntity = await mongoose
      .model(entity)
      .findByIdAndUpdate(
        entityId,
        { $pull: { images: { public_id: imageId } } },
        { new: true }
      );

    if (!updatedEntity) {
      return res.status(404).json({ message: `${entity} not found` });
    }

    res.json({ message: "Image deleted!", updatedEntity });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  uploadImages,
  deleteImages,
};
