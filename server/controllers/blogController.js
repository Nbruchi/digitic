const asyncHandler = require("express-async-handler");
const Blog = require("../models/blogModel");
const validateMongoDBId = require("../utils/validateMongoDBId");
const { cloudinaryUploadImage } = require("../utils/cloudinary");
const fs = require("fs");

const createBlog = asyncHandler(async (request, response) => {
  try {
    const newBlog = await Blog.create(request.body);
    response.json({
      status: "success",
      newBlog,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllBlogs = asyncHandler(async (request, response) => {
  try {
    const blogs = await Blog.find();
    response.json(blogs);
  } catch (error) {
    throw new Error(error);
  }
});

const updateBlog = asyncHandler(async (request, response) => {
  const { id } = request.params;
  validateMongoDBId(id);
  try {
    const blog = await Blog.findByIdAndUpdate(id, request.body, { new: true });
    response.json(blog);
  } catch (error) {
    throw new Error(error);
  }
});

const getBlog = asyncHandler(async (request, response) => {
  const { id } = request.params;
  validateMongoDBId(id);
  try {
    const blog = await Blog.findById(id).populate("likes").populate("dislikes");

    await Blog.findByIdAndUpdate(id, { $inc: { numViews: 1 } }, { new: true });
    response.json(blog);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteBlog = asyncHandler(async (request, response) => {
  const { id } = request.params;
  validateMongoDBId(id);
  try {
    await Blog.findByIdAndDelete(id);
    response.json({ message: "Blog deleted" });
  } catch (error) {
    throw new Error(error);
  }
});

const likeBlog = asyncHandler(async (request, response) => {
  const { blogId } = request.body;
  validateMongoDBId(blogId);
  const blog = await Blog.findById(blogId);
  const loggedinUserID = request?.user?._id;
  const isLiked = blog?.isLiked;
  const alreadyDisliked = blog.dislikes.find(
    (userId) => userId.toString() === loggedinUserID?.toString()
  );

  if (alreadyDisliked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loggedinUserID },
        isDisliked: false,
      },
      { new: true }
    );
    response.json(blog);
  }

  if (isLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loggedinUserID },
        isLiked: true,
      },
      { new: true }
    );
    response.json(blog);
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { likes: loggedinUserID },
        isLiked: true,
      },
      { new: true }
    );
    response.json(blog);
  }
});

const dislikeBlog = asyncHandler(async (request, response) => {
  const { blogId } = request.body;
  validateMongoDBId(blogId);
  const blog = await Blog.findById(blogId);
  const loggedinUserID = request?.user?._id;
  const isDisliked = blog?.isDisliked;
  const alreadyLiked = blog.likes.find(
    (userId) => userId.toString() === loggedinUserID?.toString()
  );

  if (alreadyLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loggedinUserID },
        isLiked: false,
      },
      { new: true }
    );
    response.json(blog);
  }

  if (isDisliked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loggedinUserID },
        isDisliked: false,
      },
      { new: true }
    );
    response.json(blog);
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { dislikes: loggedinUserID },
        isDisliked: true,
      },
      { new: true }
    );
    response.json(blog);
  }
});

module.exports = {
  createBlog,
  getAllBlogs,
  updateBlog,
  getBlog,
  deleteBlog,
  likeBlog,
  dislikeBlog,
};
