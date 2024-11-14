import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "../components/Breadcrumb";
import Container from "../components/Container";
import Meta from "../components/Meta";
import { useEffect } from "react";
import { getOrders } from "../features/user/userSlice";

const Orders = () => {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.user?.orders);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return (
    <>
      <Meta title="My Orders" />
      <Breadcrumb title="My Orders" />
      <Container className="order-wrapper">
        <div className="row">
          {orderState?.length ? (
            <>
              <div className="col-12">
                <div className="row">
                  <div className="col-3">
                    <h5>Order ID</h5>
                  </div>
                  <div className="col-3">
                    <h5>Total Amount</h5>
                  </div>
                  <div className="col-3">
                    <h5>Total Amount After Discount</h5>
                  </div>
                  <div className="col-3">
                    <h5>Status</h5>
                  </div>
                </div>
              </div>
              {orderState?.map((order) => (
                <div className="col-12" key={order?._id}>
                  <div
                    className="row my-3 pt-3"
                    style={{ backgroundColor: "#febd69" }}
                  >
                    <div className="col-3">
                      <p>{order?._id}</p>
                    </div>
                    <div className="col-3">
                      <p>{order?.totalPrice}</p>
                    </div>
                    <div className="col-3">
                      <p>{order?.totalPriceAfterDiscount}</p>
                    </div>
                    <div className="col-3">
                      <p>{order?.orderStatus}</p>
                    </div>
                    <div className="col-12">
                      <div
                        className="row py-3"
                        style={{ backgroundColor: "#232f3e" }}
                      >
                        <div className="col-3">
                          <h6 className="text-white">Product Name</h6>
                        </div>
                        <div className="col-3">
                          <h6 className="text-white">Quantity</h6>
                        </div>
                        <div className="col-3">
                          <h6 className="text-white">Price</h6>
                        </div>
                        <div className="col-3">
                          <h6 className="text-white">Color</h6>
                        </div>
                      </div>
                      {order?.orderItems &&
                        order?.orderItems?.map((item) => (
                          <div className="row py-3" key={item?._id}>
                            <div className="col-3">
                              <h6 className="text-white">
                                {item?.product?.title}
                              </h6>
                            </div>
                            <div className="col-3">
                              <h6 className="text-white">{item?.quantity}</h6>
                            </div>
                            <div className="col-3">
                              <h6 className="text-white">{item?.price}</h6>
                            </div>
                            <div className="col-3">
                              <ul className="colors ps-0">
                                <li
                                  style={{
                                    backgroundColor: item?.color?.title,
                                  }}
                                />
                              </ul>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p className="text-center fs-3">No orders yet!</p>
          )}
        </div>
      </Container>
    </>
  );
};

export default Orders;
