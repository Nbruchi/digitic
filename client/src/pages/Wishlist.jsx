import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "../components/Breadcrumb";
import Container from "../components/Container";
import Meta from "../components/Meta";
import { getUserWishlist } from "../features/user/userSlice";
import { addToWishlist } from "../features/products/productSlice";
import { useEffect } from "react";

const Wishlist = () => {
  const dispatch = useDispatch();
  const getWishlist = () => dispatch(getUserWishlist());
  useEffect(() => {
    getWishlist();
  }, []);

  const wishlistState = useSelector((state) => state.user?.wishlist?.wishlist);

  const removeFromWishlist = (id) => {
    dispatch(addToWishlist(id));
    setTimeout(() => {
      dispatch(getUserWishlist());
    }, 300);
  };

  return (
    <>
      <Meta title="Wishlist" />
      <Breadcrumb title="Wishlist" />
      <Container className="wishlist-wrapper">
        <div className="row">
          {wishlistState?.length ? (
            <>
              {wishlistState.map((product) => (
                <div className="col-3" key={product?._id}>
                  <div className="wishlist-card position-relative">
                    <button
                      className="border-0 bg-none"
                      onClick={() => removeFromWishlist(product?._id)}
                    >
                      <img
                        src="images/cross.svg"
                        alt="cross"
                        className="position-absolute cross img-fluid"
                      />
                    </button>
                    <div className="wishlist-card-image">
                      <img
                        src={product?.images[0]?.url || "images/watch.jpg"}
                        alt="watch"
                        className="img-fluid mx-auto d-block"
                      />
                    </div>
                    <div className="py-3 wishlist-details">
                      <h5 className="title">{product?.title}</h5>
                      <h6 className="price mb-3">${product?.price}</h6>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p className="text-center fs-3">No data</p>
          )}
        </div>
      </Container>
    </>
  );
};

export default Wishlist;
