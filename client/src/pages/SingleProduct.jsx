import { useEffect, useState } from "react";
import Color from "../components/Color";
import Breadcrumb from "../components/Breadcrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import ReactStars from "react-rating-stars-component";
import ReactImageZoom from "react-image-zoom";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { copyToClipboard } from "../utils";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import {
  addRating,
  getAllProducts,
  getProduct,
} from "../features/products/productSlice";
import { toast } from "react-toastify";
import { createCart, getCart } from "../features/user/userSlice";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [color, setColor] = useState(null);
  const [star, setStar] = useState(null);
  const [comment, setComment] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const productId = location.pathname.split("/")[2];
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const [popularProducts, setPopularProducts] = useState([]);
  const [orderedProduct, setOrderedProuct] = useState(true);
  const cartState = useSelector((state) => state.user.cartProducts);
  const productState = useSelector((state) => state.product?.singleProduct);
  const productsState = useSelector((state) => state.product?.products);

  useEffect(() => {
    dispatch(getProduct(productId));
    dispatch(getCart());
    dispatch(getAllProducts());
  }, [dispatch, productId]);

  const props = {
    width: 400,
    height: 500,
    zoomWidth: 600,
    img: productState?.images[0]?.url || "/images/tab.jpg",
  };

  useEffect(() => {
    for (let index = 0; index < cartState; index++) {
      if (productId === cartState[index]?.productId?._id) {
        setAlreadyAdded(true);
      }
    }
  }, [cartState, productId]);

  const addToCart = () => {
    if (color == null) {
      toast.error(`Please choose a color`);
      return false;
    } else {
      dispatch(
        createCart({
          productId: productState?._id,
          quantity,
          color,
          price: productState?.price,
        })
      );
      navigate("/cart");
    }
  };

  useEffect(() => {
    let data = [];

    for (let index = 0; index < productsState.length; index++) {
      const element = productsState[index];
      data.push(element);
    }
    setPopularProducts(data);
  }, [productsState]);

  const handleReviewSubmit = () => {
    if (star === null) {
      toast.error(`Please add star rating`);
      return false;
    } else if (comment === null) {
      toast.error(`Please write review about the product`);
      return false;
    } else {
      dispatch(addRating({ star, comment, productId }));
    }
  };

  return (
    <>
      <Meta title={productState?.title} />
      <Breadcrumb title={productState?.title} />
      <Container className="main-product-wrapper">
        <div className="row">
          <div className="col-6">
            <div className="main-product-image">
              <div>
                <ReactImageZoom {...props} />
              </div>
            </div>
            <div className="other-product-images d-flex flex-wrap gap-15">
              {productState?.images.length ? (
                <>
                  {productState?.images.map((image) => (
                    <div key={image?.public_id}>
                      <img
                        src={image?.url}
                        alt={image?.public_id}
                        className="img-fluid w-50"
                      />
                    </div>
                  ))}
                </>
              ) : (
                <p className="text-center fs-2">
                  No other product pictures available yet!
                </p>
              )}
            </div>
          </div>
          <div className="col-6">
            <div className="main-product-details">
              <div className="border-bottom">
                <h3 className="title">{productState?.title}</h3>
              </div>
              <div className="border-bottom py-3">
                <p className="price">${productState?.price}</p>
                <div className="d-flex align-items-center gap-10">
                  <ReactStars
                    count={5}
                    size={24}
                    value={Number(productState?.totalRating)}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p className="mb-0 t-review">(2 reviews)</p>
                </div>
                <a href="#review" className="review-btn">
                  Write a review
                </a>
              </div>
              <div className="border-bottom">
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Type:</h3>
                  <p className="product-data">{productState?.category}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Brand:</h3>
                  <p className="product-data">{productState?.brand}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Category:</h3>
                  <p className="product-data">{productState?.category}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Tags:</h3>
                  <p className="product-data">{productState?.tag}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Availability:</h3>
                  <p className="product-data">
                    {productState?.quantity} In Stock
                  </p>
                </div>
                <div className="d-flex gap-10 flex-column mt-2 mb-3">
                  <h3 className="product-heading">Color:</h3>
                  <Color colors={productState?.color} setColor={setColor} />
                </div>
                <div className="d-flex gap-10 mt-2 mb-3 align-items-center">
                  {!alreadyAdded && (
                    <>
                      <h3 className="product-heading">Quantity:</h3>
                      <div>
                        <input
                          type="number"
                          className="form-control"
                          min={1}
                          max={10}
                          style={{ width: "70px" }}
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                        />
                      </div>
                    </>
                  )}
                  <div
                    className={`d-flex align-items-center gap-30  ${
                      alreadyAdded ? "ms-0" : "ms-5"
                    }`}
                  >
                    {alreadyAdded ? (
                      <button
                        className="button"
                        onClick={() => navigate("/cart")}
                      >
                        Go to cart
                      </button>
                    ) : (
                      <>
                        <button className="button" onClick={() => addToCart()}>
                          Add to Cart
                        </button>
                        <Link to="/checkout" className="button signup">
                          Buy it Now
                        </Link>
                      </>
                    )}
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <div>
                    <a href="/wishlist">
                      <AiOutlineHeart className="fs-5 me-2" /> Add to Wishlist
                    </a>
                  </div>
                </div>
                <div className="d-flex gap-10 flex-column my-3">
                  <h3 className="product-heading">Shipping & Returns</h3>
                  <p className="product-data">
                    Free shipping and returns available on all orders! <br />
                    We ship all US domestic products within
                    <b>5-10 business days!</b>
                  </p>
                </div>
                <div className="d-flex gap-10 my-3 align-items-center">
                  <h3 className="product-heading">Product Link</h3>
                  <button
                    onClick={() => copyToClipboard(window.location.href)}
                    className="border-0 bg-transparent m-0 p-0"
                    style={{ fontSize: "14px" }}
                  >
                    Copy Product Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container className="description-wrapper">
        <div className="row">
          <div className="col-12">
            <h4>Description</h4>
            <p
              className="bg-white p-3"
              dangerouslySetInnerHTML={{ __html: productState?.description }}
            />
          </div>
        </div>
      </Container>
      <Container className="reviews-wrapper">
        <div className="row">
          <div className="col-12">
            <h4>Reviews</h4>
            <div className="review-inner-wrapper">
              <div className="review-head d-flex justify-content-between align-items-end">
                <div>
                  <h4 className="mb-2">Customer Reviews</h4>
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars
                      count={5}
                      size={24}
                      value={3}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className="mb-0">
                      Based on{" "}
                      {productsState?.totalRating
                        ? productState.totalRating
                        : 0}{" "}
                      reviews
                    </p>
                  </div>
                </div>
                {orderedProduct && (
                  <div>
                    <button
                      className="text-dark text-decoration-underline"
                      onClick={() => setOrderedProuct((prev) => !prev)}
                    >
                      Write a review
                    </button>
                  </div>
                )}
              </div>
              <div className="review-form" id="review">
                <h4>Write a Review</h4>
                <form
                  className="d-flex flex-column gap-15"
                  onSubmit={handleReviewSubmit}
                >
                  <div>
                    <ReactStars
                      count={5}
                      size={24}
                      value={star}
                      edit={true}
                      activeColor="#ffd700"
                      onChange={(e) => setStar(e)}
                    />
                  </div>
                  <div>
                    <textarea
                      rows="4"
                      cols="30"
                      className="w-100 form-control"
                      placeholder="Write your comments here"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button className="button my-3" type="submit">
                      Submit Review
                    </button>
                  </div>
                </form>
              </div>
              <div className="reviews">
                {productState?.ratings?.length ? (
                  productState?.ratings?.map((item) => (
                    <div className="review" key={item?._id}>
                      <div className="d-flex gap-10 align-items-center">
                        <ReactStars
                          count={5}
                          size={24}
                          value={item?.star}
                          edit={true}
                          activeColor="#ffd700"
                        />
                      </div>
                      <p className="mb-3">{item?.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="fs-3 text-center mt-2">No reviews yet!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
      {popularProducts?.length ? (
        <>
          <Container className="recommended-wrapper">
            <div className="row">
              <div className="col-12">
                <h3 className="section-heading">You may also like</h3>
              </div>
              {popularProducts?.map((item) => {
                if (item?.tag == "Popular") {
                  return <ProductCard product={item} key={item?._id} />;
                }
              })}
            </div>
          </Container>
        </>
      ) : (
        <p className="fs-2 text-center">No items recommended!</p>
      )}
    </>
  );
};

export default SingleProduct;
