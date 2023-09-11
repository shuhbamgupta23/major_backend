import { asyncErrorHandler } from "./../middleware/catchAsynError.js";
import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51LePMCSAdKC6NlAlxM8uDVExpdtlvtHurzDYDDqAP8i0MaO3jhRHYp5kGLXSqgIfV3TH2vZRfjcz80aEndJotScg003qbcKYyt"
);

export const processPayment = asyncErrorHandler(async (req, res, next) => {
  try {
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "inr",
      metadata: {
        company: "Ecommerce",
      },
    });

    res
      .status(200)
      .json({ success: true, client_secret: myPayment.client_secret });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

export const sendStripeApiKey = asyncErrorHandler(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});
