import Meta from "../components/Meta";
import Breadcrumb from "../components/Breadcrumb";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getCart,
  removeCartProduct,
  updateCartProductQuantity,
} from "../features/user/userSlice";

const Cart = () => {
  const cartState = useSelector((state) => state.user.cartProducts);
  const [productDetail, setProductDetail] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const deleteCartProduct = (id) => {
    dispatch(removeCartProduct(id));
    setTimeout(() => {
      dispatch(getCart());
    }, 200);
  };

  useEffect(() => {
    if (productDetail != null) {
      dispatch(
        updateCartProductQuantity({
          cartId: productDetail?.cartId,
          quantity: productDetail?.quantity,
        })
      );
      setTimeout(() => {
        dispatch(getCart());
      }, 200);
    }
  }, [productDetail, dispatch]);

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum = sum + Number(cartState[index]?.quantity) * cartState[index]?.price;
    }
    setTotalAmount(sum);
  }, [cartState]);

  return (
    <>
      <Meta title="Cart" />
      <Breadcrumb title="Cart" />
      <Container className="cart-wrapper">
        <div className="row">
          <div className="col-12">
            {cartState?.length ? (
              <>
                <div className="cart-header d-flex align-items-center justify-content-between">
                  <h4 className="cart-col-1">Product</h4>
                  <h4 className="cart-col-2">Price</h4>
                  <h4 className="cart-col-3">Quantity</h4>
                  <h4 className="cart-col-4">Total</h4>
                </div>
                {cartState?.map((item) => (
                  <div
                    className="cart-header d-flex align-items-center justify-content-between mb-2"
                    key={item?._id}
                  >
                    <div className="cart-col-1 d-flex align-items-center">
                      <div className="w-25">
                        <img
                          src={
                            item?.productId?.images[0]?.url ||
                            "/images/headphone.jpg"
                          }
                          alt="headphone"
                          className="img-fluid"
                        />
                      </div>
                      <div className="w-75">
                        <h5 className="title">{item?.productId?.title}</h5>
                        <div className="d-flex align-items-center gap-15">
                          <p className="color mb-0">Color:</p>
                          <li
                            style={{ background: item?.color?.title }}
                            key={item?.color?._id}
                            className="cart-color"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="cart-col-2 cart-data">
                      <h5 className="price">${item?.price}</h5>
                    </div>
                    <div className="cart-col-3 d-flex align-items-center gap-15">
                      <div>
                        <input
                          min={1}
                          max={10}
                          type="number"
                          className="form-control"
                          value={
                            item?.quantity
                              ? item?.quantity
                              : productDetail?.quantity
                          }
                          onChange={(e) =>
                            setProductDetail({
                              cartId: item?._id,
                              quantity: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div
                        onClick={() => deleteCartProduct(item?._id)}
                        className="cursor-pointer"
                      >
                        <AiFillDelete className="text-danger" />
                      </div>
                    </div>
                    <div className="cart-col-4 cart-data">
                      <h5 className="price">${item?.price * item?.quantity}</h5>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <p className="text-center fs-2">Your cart is empty!</p>
            )}
          </div>
          <div className="col-12 py-2 mt-4">
            <div className="d-flex justify-content-between align-items-baseline">
              <Link to="/store" className="button">
                Continue shopping
              </Link>
              {totalAmount !== null && totalAmount !== 0 && (
                <div className="d-flex flex-column justify-content-end">
                  <h4>Subtotal: ${totalAmount}</h4>
                  <p className="my-2">
                    Taxes and shipping calculated at checkout
                  </p>
                  <Link className="button" to="/checkout">
                    Checkout
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
