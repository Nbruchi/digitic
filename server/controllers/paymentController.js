const asyncHandler = require("express-async-handler");
const Stripe = require("stripe");

const stripe = Stripe(process.env.STRIPE_SECRET_SECRET);

const checkout = asyncHandler(async (req, res) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "usd",
    });

    res.send({
      clientSecret: paymentIntent?.client_secret,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const paymentVerification = asyncHandler(async (req, res) => {
  const { paymentIntentId } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntent.retrieve(paymentIntentId);
    res.send({ success: paymentIntent.status === "succeeded" });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { checkout, paymentVerification };
