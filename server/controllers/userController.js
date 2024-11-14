const User = require("../models/userModel");
const Cart = require("../models/cartModel");
const Order = require("../models/orderModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const { generateRefreshToken } = require("../config/refreshtoken");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const validateMongoDBId = require("../utils/validateMongoDBId");
const { sendEmail } = require("./emailController");

// Create a User ----------------------------------------------

const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;

    const findUser = await User.findOne({ email: email });

    if (!findUser) {
        const newUser = await User.create(req.body);
        res.json(newUser);
    } else {
        throw new Error("User Already Exists");
    }
});

// Login a user
const loginUserCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // check if user exists or not
    const findUser = await User.findOne({ email });
    if (findUser && (await findUser.isPasswordMatched(password))) {
        const refreshToken = await generateRefreshToken(findUser?._id);
        const updateuser = await User.findByIdAndUpdate(
            findUser?._id,
            {
                refreshToken: refreshToken,
            },
            { new: true }
        );
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        });
        res.json({
            _id: findUser?._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id),
        });
    } else {
        throw new Error("Invalid Credentials");
    }
});

// admin login
const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // check if user exists or not
    const findAdmin = await User.findOne({ email });
    if (findAdmin.role !== "admin") throw new Error("Not Authorised");
    if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
        const refreshToken = await generateRefreshToken(findAdmin?._id);
        const updateuser = await User.findByIdAndUpdate(
            findAdmin.id,
            {
                refreshToken: refreshToken,
            },
            { new: true }
        );
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        });
        res.json({
            _id: findAdmin?._id,
            firstname: findAdmin?.firstname,
            lastname: findAdmin?.lastname,
            email: findAdmin?.email,
            mobile: findAdmin?.mobile,
            token: generateToken(findAdmin?._id),
        });
    } else {
        throw new Error("Invalid Credentials");
    }
});

// handle refresh token
const handleRefreshToken = asyncHandler(async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.refreshToken) {
        return res.status(401).json({ message: "No Refresh Token in Cookies" });
    }
    const refreshToken = cookies.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) {
        return res
            .status(401)
            .json({ message: "No Refresh Token present in DB or not matched" });
    }
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err || user._id.toString() !== decoded.id) {
            return res
                .status(403)
                .json({ message: "Invalid Refresh Token or User ID mismatch" });
        }
        const accessToken = generateToken(user._id);
        res.json({ accessToken });
    });
});

// logout functionality
const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");

    const refreshToken = cookie.refreshToken;

    // Find the user by refreshToken and update it
    const user = await User.findOne({ refreshToken: refreshToken });

    if (!user) {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
        });
        return res.sendStatus(204); // No content
    }

    // Update the refreshToken to an empty string
    await User.findOneAndUpdate(
        { refreshToken: refreshToken },
        {
            refreshToken: "",
        }
    );

    // Clear the refreshToken cookie
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
    });

    // Send a successful logout response
    res.json({ message: `User logged out` }); // No content
});

// Update a user
const updatedUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDBId(_id);
    try {
        const updatedUser = await User.findByIdAndUpdate(
            _id,
            {
                firstname: req?.body?.firstname,
                lastname: req?.body?.lastname,
                email: req?.body?.email,
                mobile: req?.body?.mobile,
            },
            {
                new: true,
            }
        );
        res.json(updatedUser);
    } catch (error) {
        throw new Error(error);
    }
});

// save user Address

const saveAddress = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDBId(_id);
    try {
        const updatedUser = await User.findByIdAndUpdate(
            _id,
            {
                address: req?.body?.address,
            },
            {
                new: true,
            }
        );
        res.json(updatedUser);
    } catch (error) {
        throw new Error(error);
    }
});

// Get all users

const getallUser = asyncHandler(async (req, res) => {
    try {
        const getUsers = await User.find().populate("wishlist");
        res.json(getUsers);
    } catch (error) {
        throw new Error(error);
    }
});

// Get a single user

const getaUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDBId(id);
    try {
        const getaUser = await User.findById(id);
        res.json(getaUser);
    } catch (error) {
        throw new Error(error);
    }
});

// Get a single user

const deleteaUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDBId(id);
    try {
        const deleteaUser = await User.findByIdAndDelete(id);
        res.json({
            deleteaUser,
        });
    } catch (error) {
        throw new Error(error);
    }
});

const blockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDBId(id);
    try {
        await User.findByIdAndUpdate(
            id,
            {
                isBlocked: true,
            },
            {
                new: true,
            }
        );
        res.json({ message: `User blocked` });
    } catch (error) {
        throw new Error(error);
    }
});

const unblockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDBId(id);

    try {
        const unblock = await User.findByIdAndUpdate(
            id,
            {
                isBlocked: false,
            },
            {
                new: true,
            }
        );
        res.json({
            message: "User UnBlocked",
        });
    } catch (error) {
        throw new Error(error);
    }
});

const updatePassword = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDBId(_id);
    const { password } = req.body;
    const user = await User.findById(_id);
    if (password) {
        user.password = password;
        const updatedPassword = await user.save();
        res.json(updatedPassword);
    } else {
        res.json(user);
    }
});

const forgotPasswordToken = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found with this email");
    try {
        const token = await user.createPasswordResetToken();
        await user.save();
        const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:5173/api/users/reset-password/${token}'>Click Here</>`;
        const data = {
            to: email,
            text: `Hey ${user.firstname}`,
            subject: "Forgot Password Link",
            htm: resetURL,
        };
        sendEmail(data);
        res.json(token);
    } catch (error) {
        throw new Error(error);
    }
});

const resetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) throw new Error(" Token Expired, Please try again later");
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.json(user);
});

const getWishlist = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDBId(_id);
    try {
        const findUser = await User.findById(_id).populate("wishlist");
        res.json(findUser);
    } catch (error) {
        throw new Error(error);
    }
});

const createUserCart = asyncHandler(async (req, res) => {
    const { productId, quantity, color, price } = req.body;
    const { _id } = req.user;
    validateMongoDBId(_id);
    try {
        let newCart = await new Cart({
            productId,
            userId: _id,
            quantity,
            price,
            color,
        }).save();
        res.json(newCart);
    } catch (error) {
        throw new Error(error);
    }
});

const getUserCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDBId(_id);
    try {
        const cart = await Cart.find({ userId: _id })
            .populate("productId")
            .populate("color");
        res.json(cart);
    } catch (error) {
        throw new Error(error);
    }
});

const removeCartProduct = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { cartId } = req.params;
    validateMongoDBId(_id);
    validateMongoDBId(cartId);
    try {
        const product = await Cart.deleteOne({ userId: _id, _id: cartId });
        res.json(product);
    } catch (error) {
        throw new Error(error);
    }
});

const updateCartProductQuantity = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { cartId, newQuantity } = req.params;
    validateMongoDBId(_id);
    validateMongoDBId(cartId);
    try {
        const cartItem = await Cart.findOne({ userId: _id, _id: cartId });
        cartItem.quantity = newQuantity;
        cartItem.save();
        res.json(cartItem);
    } catch (error) {
        throw new Error(error);
    }
});

const emptyCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDBId(_id);
    try {
        await Cart.deleteMany({ userId: _id });
        res.sendStatus(204);
    } catch (error) {
        throw new Error(error);
    }
});

const createOrder = asyncHandler(async (req, res) => {
    const {
        shippingInfo,
        paymentInfo,
        orderItems,
        totalPrice,
        totalPriceAfterDiscount,
    } = req.body;
    const { _id } = req.user;
    validateMongoDBId(_id);
    try {
        const user = await User.findById(_id);
        const order = await Order.create({
            shippingInfo,
            paymentInfo,
            orderItems,
            totalPrice,
            totalPriceAfterDiscount,
            user,
        });
        res.json(order);
    } catch (error) {
        throw new Error(error);
    }
});

const getUserOrders = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDBId(_id);

    try {
        const orders = await Order.find({ user: _id })
            .populate("user")
            .populate("orderItems.product")
            .populate("orderItems.color");
        res.json(orders);
    } catch (error) {
        throw new Error(error);
    }
});

const getAllOrders = asyncHandler(async (req, res) => {
    try {
        const orders = await Order.find().populate("user");
        res.json(orders);
    } catch (error) {
        throw new Error(error);
    }
});

const getOrder = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDBId(id);
    try {
        const order = await Order.findById(id)
            .populate("orderItems.product")
            .populate("orderItems.color");
        res.json(order);
    } catch (error) {
        throw new Error(error);
    }
});

const updateOrder = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDBId(id);
    try {
        const order = await Order.findById(id);
        order.status = req.body.status;
        await order.save();
        res.json(order);
    } catch (error) {
        throw new Error(error);
    }
});

const getMonthlyOrderIncome = asyncHandler(async (req, res) => {
    let monthNames = [
        "January",
        "February",
        "March",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    let d = new Date();
    let endDate = "";
    d.setDate(1);
    for (let index = 0; index < 11; index++) {
        d.setMonth(d.getMonth() - 1);
        endDate = monthNames[d.getMonth()] + " " + d.getFullYear();
    }

    try {
        const data = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $lte: new Date(),
                        $gte: new Date(endDate),
                    },
                },
            },
            {
                $group: {
                    _id: {
                        month: "$month",
                    },
                    count: {
                        $sum: 1,
                    },
                    amount: {
                        $sum: "$totalPriceAfterDiscount",
                    },
                },
            },
        ]);
        res.json(data);
    } catch (error) {
        throw new Error(error);
    }
});

const getAnnualTotalOrders = asyncHandler(async (req, res) => {
    let monthNames = [
        "January",
        "February",
        "March",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    let d = new Date();
    let endDate = "";
    d.setDate(1);
    for (let index = 0; index < 11; index++) {
        d.setMonth(d.getMonth() - 1);
        endDate = monthNames[d.getMonth()] + " " + d.getFullYear();
    }

    try {
        const data = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $lte: new Date(),
                        $gte: new Date(endDate),
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    count: {
                        $sum: 1,
                    },
                    amount: {
                        $sum: "$totalPriceAfterDiscount",
                    },
                },
            },
        ]);
        res.json(data);
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = {
    logout,
    getOrder,
    getaUser,
    emptyCart,
    blockUser,
    createUser,
    loginAdmin,
    getallUser,
    createOrder,
    deleteaUser,
    updatedUser,
    getWishlist,
    saveAddress,
    updateOrder,
    getUserCart,
    unblockUser,
    getAllOrders,
    getUserOrders,
    loginUserCtrl,
    resetPassword,
    updatePassword,
    createUserCart,
    removeCartProduct,
    handleRefreshToken,
    forgotPasswordToken,
    getAnnualTotalOrders,
    getMonthlyOrderIncome,
    updateCartProductQuantity,
};
