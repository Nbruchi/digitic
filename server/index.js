require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT;
const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const dbConnection = require("./config/dbConnection");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const blogRoutes = require("./routes/blogRoutes");
const productCategoryRoutes = require("./routes/productCategoryRoutes");
const blogCategoryRoutes = require("./routes/blogCategoryRoutes");
const brandRoutes = require("./routes/brandRoutes");
const couponRoutes = require("./routes/couponRoutes");
const colorRoutes = require("./routes/colorRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const enquiryRoutes = require("./routes/enquiryRoutes");

dbConnection();

app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/users", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/product-categories", productCategoryRoutes);
app.use("/api/blog-categories", blogCategoryRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/colors", colorRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/enquiries", enquiryRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
