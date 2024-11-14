const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const slugify = require("slugify");
const validateMongoDBId = require("../utils/validateMongoDBId");

const createProduct = asyncHandler(async (request, response) => {
    try {
        if (request.body.title) {
            request.body.slug = slugify(request.body.title);
        }

        const newProduct = await Product.create(request.body);
        response.json(newProduct);
    } catch (error) {
        throw new Error(error);
    }
});

const getAllProducts = asyncHandler(async (request, response) => {
    try {
        // Filtering
        const queryObject = { ...request.query };
        const excludedFields = ["page", "sort", "fields", "limit"];
        excludedFields.forEach((field) => delete queryObject[field]);
        let queryString = JSON.stringify(queryObject);
        queryString = queryString.replace(
            /\b(gte|gt|lte|lt)\b/g,
            (match) => `$${match}`
        );
        let query = Product.find(JSON.parse(queryString));

        // Sorting
        if (request.query.sort) {
            const sortBy = request.query.sort.split(",").join(" ");
            query = query.sort(sortBy);
        } else {
            query = query.sort("-createdAt");
        }

        //Limiting the fields
        if (request.query.fields) {
            const fields = request.query.fields.split(",").join(" ");
            query = query.select(fields);
        } else {
            query = query.select("-__v");
        }

        // Pagination
        const page = request.query.page;
        const limit = request.query.limit;
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);
        if (request.query.page) {
            const productsCount = await Product.countDocuments();
            if (skip >= productsCount) {
                throw new Error("This page doesn't exist");
            }
        }

        const products = await query;
        response.json(products);
    } catch (error) {
        throw new Error(error);
    }
});

const getaProduct = asyncHandler(async (request, response) => {
    const { id } = request.params;
    validateMongoDBId(id);
    try {
        const product = await Product.findById(id).populate("color");
        response.json(product);
    } catch (error) {
        throw new Error(error);
    }
});

const updateProduct = asyncHandler(async (request, response) => {
    const { id } = request.params;
    validateMongoDBId(id);
    try {
        if (request.body.title) {
            request.body.slug = slugify(request.body.title);
        }
        const product = await Product.findByIdAndUpdate(id, request.body, {
            new: true,
        });
        response.json(product);
    } catch (error) {
        throw new Error(error);
    }
});

const deleteProduct = asyncHandler(async (request, response) => {
    const { id } = request.params;
    validateMongoDBId(id);
    try {
        await Product.findByIdAndDelete(id);
        response.json({ message: `Product deleted` });
    } catch (error) {
        throw new Error(error);
    }
});

const addToWishlist = asyncHandler(async (request, response) => {
    const { _id } = request.user;
    validateMongoDBId(_id);
    const { productId } = request.body;
    validateMongoDBId(productId);
    try {
        const user = await User.findById(_id);
        const alreadyAdded = user.wishlist.find(
            (id) => id.toString() === productId
        );
        if (alreadyAdded) {
            let user = await User.findByIdAndUpdate(
                _id,
                { $pull: { wishlist: productId } },
                { new: true }
            );
            response.json(user);
        } else {
            let user = await User.findByIdAndUpdate(
                _id,
                { $push: { wishlist: productId } },
                { new: true }
            );
            response.json(user);
        }
    } catch (error) {
        throw new Error(error);
    }
});

const rating = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { star, productId, comment } = req.body;
    try {
        const product = await Product.findById(productId);
        let alreadyRated = product.ratings.find(
            (userId) => userId.postedby.toString() === _id.toString()
        );
        if (alreadyRated) {
            await Product.updateOne(
                {
                    ratings: { $elemMatch: alreadyRated },
                },
                {
                    $set: {
                        "ratings.$.star": star,
                        "ratings.$.comment": comment,
                    },
                },
                {
                    new: true,
                }
            );
        } else {
            await Product.findByIdAndUpdate(
                productId,
                {
                    $push: {
                        ratings: {
                            star: star,
                            comment: comment,
                            postedby: _id,
                        },
                    },
                },
                {
                    new: true,
                }
            );
        }
        const getallratings = await Product.findById(productId);
        let totalRating = getallratings.ratings.length;
        let ratingsum = getallratings.ratings
            .map((item) => item.star)
            .reduce((prev, curr) => prev + curr, 0);
        let actualRating = Math.round(ratingsum / totalRating);
        let finalproduct = await Product.findByIdAndUpdate(
            productId,
            {
                totalRating: actualRating,
            },
            { new: true }
        );
        res.json(finalproduct);
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = {
    createProduct,
    getAllProducts,
    getaProduct,
    updateProduct,
    deleteProduct,
    addToWishlist,
    rating,
};
