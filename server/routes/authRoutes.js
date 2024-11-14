const express = require("express");
const {
  logout,
  getaUser,
  blockUser,
  createUser,
  getallUser,
  loginAdmin,
  createOrder,
  deleteaUser,
  getUserCart,
  getWishlist,
  saveAddress,
  unblockUser,
  updatedUser,
  loginUserCtrl,
  resetPassword,
  createUserCart,
  updatePassword,
  removeCartProduct,
  handleRefreshToken,
  forgotPasswordToken,
  updateCartProductQuantity,
  getUserOrders,
  getMonthlyOrderIncome,
  getAnnualTotalOrders,
  getAllOrders,
  getOrder,
  updateOrder,
  emptyCart,
} = require("../controllers/userController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const {
  checkout,
  paymentVerification,
} = require("../controllers/paymentController");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUserCtrl);
router.post("/admin-login", loginAdmin);
router.get("/all-users", getallUser);
router.get("/logout", logout);

router.get("/refresh", handleRefreshToken);
router.put("/password", authMiddleware, updatePassword);
router.post("/forgot-password-token", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);

router.get("/wishlist", authMiddleware, getWishlist);
router.put("/address", authMiddleware, saveAddress);

router.post("/cart", authMiddleware, createUserCart);
router.get("/cart", authMiddleware, getUserCart);

router.post("/order/checkout", authMiddleware, checkout);
router.post("/order/payment-verification", authMiddleware, paymentVerification);

router.get("/all-orders", authMiddleware, isAdmin, getAllOrders);
router.post("/orders", authMiddleware, createOrder);
router.get("/orders", authMiddleware, getUserOrders);

router.get("/monthly-orders", authMiddleware, getMonthlyOrderIncome);
router.get("/annual-orders", authMiddleware, getAnnualTotalOrders);

router.delete("/empty-cart", authMiddleware, emptyCart);

// Dynamic routes
router.get("/:id", authMiddleware, getaUser);
router.put("/edit-user", authMiddleware, updatedUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

router.delete("/:id", authMiddleware, deleteaUser);
router.get("/orders/:id", authMiddleware, isAdmin, getOrder);
router.put("/orders/:id", authMiddleware, isAdmin, updateOrder);

router.delete("/cart/:cartId", authMiddleware, removeCartProduct);
router.put(
  "/cart/:cartId/:newQuantity",
  authMiddleware,
  updateCartProductQuantity
);

module.exports = router;
