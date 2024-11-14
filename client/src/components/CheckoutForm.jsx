/* eslint-disable react/prop-types */

import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { config } from "../utils/axiosConfig";
import { createOrder, emptyCart } from "../features/user/userSlice";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const CheckoutForm = ({
  totalAmount,
  shippingFee,
  shippingInfo,
  cartProductState,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);

    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/users/order/checkout`,
        { amount: totalAmount + shippingFee },
        config
      );

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        const paymentIntentId = result.paymentIntent.id;

        dispatch(
          createOrder({
            totalPrice: totalAmount,
            totalPriceAfterDiscount: totalAmount,
            orderItems: cartProductState,
            paymentInfo: { paymentIntentId },
            shippingInfo,
          })
        );

        dispatch(emptyCart());
      }
    } catch (error) {
      setError(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <CardElement className="my-3" />
      {error && <div className="error-message">{error}</div>}
      <button className="button" type="submit" disabled={!stripe || loading}>
        {loading ? "Processing..." : "Pay now"}
      </button>
    </form>
  );
};

export default CheckoutForm;
