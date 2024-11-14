/* eslint-disable react/prop-types */
import ReactStars from "react-rating-stars-component";
import { useNavigate } from "react-router-dom";

const SpecialProduct = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className="col-6 mb-3">
      <div className="special-product-card">
        <div className="d-flex justify-content-between">
          <div>
            <img src="images/watch.jpg" alt="watch" className="img-fluid" />
          </div>
          <div className="special-product-content">
            <h5 className="brand">{product?.brand}</h5>
            <h6 className="title">{`${product?.title.substr(0, 60)}...`}</h6>
            <ReactStars
              count={5}
              size={24}
              value={Number(product?.totalRating)}
              edit={false}
              activeColor="#ffd700"
            />
            <p className="price">
              <span className="red-p">${product?.price}</span>
              &nbsp; <strike>$200</strike>
            </p>
            <div className="discount-till d-flex align-items-center gap-10">
              <p className="mb-0">
                <b>5 days</b>
              </p>
              <div className="d-flex gap-10">
                <span className="badge rounded-circle p-3 bg-danger">1</span>
                <span className="badge rounded-circle p-3 bg-danger">1</span>
                <span className="badge rounded-circle p-3 bg-danger">1</span>
              </div>
            </div>
            <div className="prod-count my-3">
              <p>Products: {product?.quantity}</p>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progress-bar"
                  aria-valuenow={
                    product?.quantity / product?.quantity + product?.sold * 100
                  }
                  aria-valuemin={product?.quantity}
                  aria-valuemax={product?.sold + product?.quantity}
                  style={{
                    width:
                      product?.quantity / product?.quantity +
                      product?.sold * 100 +
                      "%",
                  }}
                ></div>
              </div>
            </div>
            <button
              className="button"
              onClick={() => navigate(`/products/${product?._id}`)}
            >
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialProduct;
