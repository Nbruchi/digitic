import * as yup from "yup";
import { Select } from "antd";
import { useFormik } from "formik";
import ReactQuill from "react-quill";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { getColors } from "../features/color/colorSlice";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { getCategories } from "../features/pcategory/pcategorySlice";
import {
  createProducts,
  getProduct,
  resetState,
  updateProduct,
} from "../features/product/productSlice";

const schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  price: yup.number().required("Price is Required"),
  brand: yup.string().required("Brand is Required"),
  category: yup.string().required("Category is Required"),
  tag: yup.string().required("Tag is Required"),
  color: yup
    .array()
    .min(1, "Pick at least one color")
    .required("Color is Required"),
  quantity: yup.number().required("Quantity is Required"),
});

const Addproduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [color, setColor] = useState([]);
  const productId = location.pathname.split("/")[3];
  const productState = useSelector((state) => state.product?.singleProduct);

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getColors());

    if (productId !== undefined) {
      dispatch(getProduct(productId));
    }
  }, [dispatch, productId]);

  const formik = useFormik({
    initialValues: {
      title: productId !== undefined ? productState?.title : "",
      description: productId !== undefined ? productState?.description : "",
      price: productId !== undefined ? productState?.price : "",
      brand: productId !== undefined ? productState?.brand : "",
      category: productId !== undefined ? productState?.category : "",
      tag: productId !== undefined ? productState?.tag : "",
      color: productId !== undefined ? productState?.color : "",
      quantity: productId !== undefined ? productState?.quantity : "",
      images: productId !== undefined ? productState?.images : "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (productId) {
        dispatch(updateProduct(values));
      } else {
        dispatch(createProducts(values));
        formik.resetForm();
        setColor(null);
        setTimeout(() => {
          dispatch(resetState());
        }, 3000);
      }
      navigate("/admin/product-list");
    },
  });

  const brandState = useSelector((state) => state.brand?.brands);
  const catState = useSelector((state) => state.pCategory?.pCategories);
  const colorState = useSelector((state) => state.color?.colors);
  const imgState = useSelector((state) => state.upload?.images);
  const newProduct = useSelector((state) => state.product);
  const { isSuccess, isError, isLoading, createdProduct, updatedProduct } =
    newProduct;

  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Product Added!");
    }

    if (isSuccess && updatedProduct) {
      toast.success("Product updated!");
    }

    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdProduct, updatedProduct]);

  const coloropt = [];
  colorState.forEach((i) => {
    coloropt.push({
      label: i.title,
      value: i._id,
    });
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    formik.values.color = color ? color : " ";
    formik.values.images = img;
  }, [color, img, formik.values]);

  const handleColors = (e) => {
    setColor(e);
  };

  return (
    <div>
      <h3 className="mb-4 title">{productId ? "Edit" : "Add"} Product</h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <CustomInput
            type="text"
            label="Enter Product Title"
            name="title"
            onChange={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
            value={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <div className="">
            <ReactQuill
              className="w-100 my-3"
              theme="snow"
              value={formik.values.description}
              onChange={formik.handleChange("description")}
            />
          </div>
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>
          <CustomInput
            type="number"
            label="Enter Product Price"
            name="price"
            onChange={formik.handleChange("price")}
            onBlur={formik.handleBlur("price")}
            value={formik.values.price}
          />
          <div className="error">
            {formik.touched.price && formik.errors.price}
          </div>
          <select
            name="brand"
            onChange={formik.handleChange("brand")}
            onBlur={formik.handleBlur("brand")}
            value={formik.values.brand}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Select Brand</option>
            {brandState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.brand && formik.errors.brand}
          </div>
          <select
            name="category"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Select Category</option>
            {catState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>
          <select
            name="tag"
            onChange={formik.handleChange("tag")}
            onBlur={formik.handleBlur("tag")}
            value={formik.values.tag}
            className="form-control py-3 mb-3"
          >
            <option value="select-tag">Select Tag</option>
            <option value="Featured">Featured</option>
            <option value="Popular">Popular</option>
            <option value="Special">Special</option>
          </select>
          <div className="error">{formik.touched.tag && formik.errors.tag}</div>

          <Select
            mode="multiple"
            allowClear
            className="w-100"
            placeholder="Select colors"
            defaultValue={color}
            onChange={(i) => handleColors(i)}
            options={coloropt}
          />
          <div className="error">
            {formik.touched.color && formik.errors.color}
          </div>
          <CustomInput
            type="number"
            label="Enter Product Quantity"
            name="quantity"
            onChange={formik.handleChange("quantity")}
            onBlur={formik.handleBlur("quantity")}
            value={formik.values.quantity}
          />
          <div className="error">
            {formik.touched.quantity && formik.errors.quantity}
          </div>
          <div className="bg-white border-1 p-5 text-center">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag &apos;n drop some files here, or click to select
                      files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages d-flex flex-wrap gap-3">
            {imgState?.map((i, j) => {
              return (
                <div className=" position-relative" key={j}>
                  <button
                    type="button"
                    onClick={() => dispatch(delImg(i.public_id))}
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img src={i.url} alt="" width={200} height={200} />
                </div>
              );
            })}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {productId ? "Edit" : "Add"} Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
