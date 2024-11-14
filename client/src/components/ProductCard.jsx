/* eslint-disable react/prop-types */
import ReactStars from "react-rating-stars-component";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { addToWishlist } from "../features/products/productSlice";

const ProductCard = ({ grid, product }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sendToWishlist = (productId) => {
    dispatch(addToWishlist(productId));
  };

  return (
    <div
      className={`${
        location.pathname === "/store" ? `gr-${grid}` : "col-3"
      } my-2`}
    >
      <div className="product-card position-relative">
        <div className="wishlist-icon position-absolute">
          <button
            className="border-0 bg-transparent"
            onClick={() => sendToWishlist(product?._id)}
          >
            <img src="/images/wish.svg" alt="wishlist" />
          </button>
        </div>
        <Link to={`/products/${product?._id}`}>
          <div className="product-image">
            <img
              src={product?.images[0]?.url || "/images/watch.jpg"}
              alt="product image"
              className="img-fluid mx-auto"
            />
            <img
              src={product?.images[1]?.url || "/images/watch-1.jpg"}
              alt="product image"
              className="img-fluid mx-auto"
            />
          </div>
        </Link>
        <div className="product-details">
          <h6 className="brand">{product?.brand}</h6>
          <h5 className="product-title">{`${product?.title.substr(
            0,
            25
          )}...`}</h5>
          <ReactStars
            count={5}
            size={24}
            value={Number(product?.totalRating)}
            edit={false}
            activeColor="#ffd700"
          />
          <p
            className={`description ${grid === 12 ? "d-block" : "d-none"}`}
            dangerouslySetInnerHTML={{
              __html: product?.description,
            }}
          />
          <p className="price">${product?.price}</p>
          <div className="action-bar position-absolute">
            <button
              className="border-0 bg-transparent"
              onClick={() => navigate(`/products/${product?._id}`)}
            >
              <img src="/images/view.svg" alt="view" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
