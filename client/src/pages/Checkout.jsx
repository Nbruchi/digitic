import * as yup from "yup";
import { useFormik } from "formik";
import Meta from "../components/Meta";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../features/user/userSlice";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { toast } from "react-toastify";

const checkoutSchema = yup.object().shape({
  firstname: yup.string().required("First name is required"),
  lastname: yup.string().required("Last name is required"),
  country: yup.string().required("Country is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  address: yup.string().required("Address is required"),
  other: yup.string(),
  zipcode: yup.number(),
});

const stripePromise = loadStripe(
  "pk_test_51NAZgEBJWsrxEnxBdj4qq8xiGR9J959gEqzALO5VJowDG7J3LEbBUVDFfTlsm7Kfn4vkDKLeUQM0jeL0CHXmtioJ00KAdl4WgW"
);

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [totalAmount, setTotalAmount] = useState(null);
  const [shippingInfo, setShippingInfo] = useState(null);
  const [cartProductState, setCartProductState] = useState([]);
  const cartState = useSelector((state) => state.user?.cartProducts);
  const authState = useSelector((state) => state.user);
  let shippingFee = 10;

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum = sum + Number(cartState[index]?.quantity) * cartState[index]?.price;
    }
    setTotalAmount(sum);
  }, [cartState]);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      country: "",
      city: "",
      state: "",
      address: "",
      other: "",
      zipcode: "",
    },
    validationSchema: checkoutSchema,
    onSubmit: (values) => {
      setShippingInfo(values);
    },
  });

  useEffect(() => {
    let items = [];

    for (let index = 0; index < cartState?.length; index++) {
      items.push({
        product: cartState[index]?.productId?._id,
        quantity: cartState[index]?.quantity,
        color: cartState[index]?.color?._id,
        price: cartState[index]?.price,
      });
    }

    setCartProductState(items);
  }, [cartState]);

  useEffect(() => {
    if (
      authState?.orderedProduct !== null &&
      authState?.orderedProduct?.success === true
    ) {
      navigate("/orders");
    } else {
      toast.error(authState?.message);
    }
  }, [authState, navigate]);

  return (
    <>
      <Meta title="Checkout" />
      <Container className="checkout-wrapper">
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              <h3 className="website-name">Digitic</h3>
              <nav
                aria-label="breadcrumb"
                style={{ "--bs-breadcrumb-divider": ">" }}
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item total-price">
                    <Link to="/cart" className="text-dark">
                      Cart
                    </Link>
                  </li>
                  &nbsp;/
                  <li
                    className="breadcrumb-item total-price active"
                    aria-current="page"
                  >
                    Information
                  </li>
                  &nbsp;/
                  <li
                    className="breadcrumb-item total-price active"
                    aria-current="page"
                  >
                    Shipping
                  </li>
                  &nbsp;/
                  <li
                    className="breadcrumb-item total-price active"
                    aria-current="page"
                  >
                    Payment
                  </li>
                </ol>
              </nav>
              <h4 className="title">Contact Information</h4>
              <p className="user-details">
                Navdeep Dahiya (monud0232@gmail.com)
              </p>
              <h4 className="mb-3">Shipping Address</h4>
              <form
                className="d-flex gap-15 justify-content-between flex-wrap"
                onSubmit={formik.handleSubmit}
              >
                <div className="w-100">
                  <select
                    name="country"
                    value={formik.values.country}
                    className="form-select form-control"
                    onBlur={formik.handleBlur("country")}
                    onChange={formik.handleChange("country")}
                  >
                    <option value="select-country">Select Country</option>
                    <option value="rwanda">Rwanda</option>
                    <option value="india">India</option>
                    <option value="canada">Canada</option>
                    <option value="egypt">Egypt</option>
                  </select>
                  <div className="error">
                    {formik.touched.country && formik.errors.country}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                    value={formik.values.firstname}
                    onBlur={formik.handleBlur("firstname")}
                    onChange={formik.handleChange("firstname")}
                  />
                  <div className="error">
                    {formik.touched.firstname && formik.errors.firstname}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last Name"
                    value={formik.values.lastname}
                    onBlur={formik.handleBlur("lastname")}
                    onChange={formik.handleChange("lastname")}
                  />
                  <div className="error">
                    {formik.touched.lastname && formik.errors.lastname}
                  </div>
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Address"
                    value={formik.values.address}
                    onBlur={formik.handleBlur("address")}
                    onChange={formik.handleChange("address")}
                  />
                  <div className="error">
                    {formik.touched.address && formik.errors.address}
                  </div>
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    className="form-control"
                    value={formik.values.other}
                    placeholder="Other information"
                    onBlur={formik.handleBlur("other")}
                    onChange={formik.handleChange("other")}
                  />
                  <div className="error">
                    {formik.touched.other && formik.errors.other}
                  </div>
                </div>

                <div className="flex-grow-1">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="City"
                    value={formik.values.city}
                    onBlur={formik.handleBlur("city")}
                    onChange={formik.handleChange("city")}
                  />
                  <div className="error">
                    {formik.touched.city && formik.errors.city}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <select
                    name="state"
                    value={formik.values.state}
                    onBlur={formik.handleBlur("state")}
                    className="form-select form-control"
                    onChange={formik.handleChange("state")}
                  >
                    <option value="select-state">Select State</option>
                    <option value="gasabo">Gasabo</option>
                    <option value="kicukiro">Kicukiro</option>
                    <option value="nyarugenge">Nyarugenge</option>
                  </select>
                  <div className="error">
                    {formik.touched.state && formik.errors.state}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Zip Code"
                    className="form-control"
                    value={formik.values.zipcode}
                    onBlur={formik.handleBlur("zipcode")}
                    onChange={formik.handleChange("zipcode")}
                  />
                  <div className="error">
                    {formik.touched.zipcode && formik.errors.zipcode}
                  </div>
                </div>
                <div className="w-100">
                  <div className="d-flex align-items-center justify-content-between">
                    <Link to="/cart" className="text-dark">
                      <BiArrowBack className="me-2" /> Return to Cart
                    </Link>
                    <button className="button" type="submit">
                      Save data
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-5">
            <div className="border-bottom py-4">
              {cartState?.length ? (
                <>
                  {cartState?.map((item) => (
                    <div
                      className="d-flex gap-10 align-items-center"
                      key={item._id}
                    >
                      <div className="w-75 d-flex gap-10">
                        <div className="w-25 position-relative">
                          <span className="badge bg-secondary text-white rounded-circle p-2 position-absolute">
                            {item?.quantity}
                          </span>
                          <img
                            src={
                              item?.productId?.images[0]?.url ||
                              "/images/watch.jpg"
                            }
                            alt={item?.title}
                            width={100}
                            height={100}
                          />
                        </div>
                        <div>
                          <h5 className="total-price">
                            {item?.productId?.title}
                          </h5>
                          <div
                            style={{
                              background: item?.color?.title,
                              width: "20px",
                              height: "20px",
                              borderRadius: "50%",
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="total-price">
                          $ {item?.price * item?.quantity}
                        </h5>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <p className="text-center fs-2">No products to order yet!</p>
              )}
            </div>
            <div className="border-bottom py-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0">Subtotal:</p>
                <p className="mb-0">$ {totalAmount ? totalAmount : 0}</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0">Shipping:</p>
                <p className="mb-0">$ {shippingFee}</p>
              </div>
            </div>
            <div className="border-bottom py-4">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="total">Total:</h4>
                <h5 className="total-price">
                  ${totalAmount ? totalAmount + shippingFee : 0}
                </h5>
              </div>
            </div>
            <Elements stripe={stripePromise}>
              <CheckoutForm
                totalAmount={totalAmount}
                shippingFee={shippingFee}
                shippingInfo={shippingInfo}
                cartProductState={cartProductState}
              />
            </Elements>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
