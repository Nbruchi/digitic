const express = require("express");
const {
  createEnquiry,
  getAllEnquirys,
  getEnquiry,
  updateEnquiry,
  deleteEnquiry,
} = require("../controllers/enquiryController");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, createEnquiry);
router.get("/", getAllEnquirys);
router.get("/:id", getEnquiry);
router.put("/:id", authMiddleware, isAdmin, updateEnquiry);
router.delete("/:id", authMiddleware, isAdmin, deleteEnquiry);

module.exports = router;
