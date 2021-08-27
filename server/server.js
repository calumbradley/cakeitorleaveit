require("dotenv").config({ path: "../.env" });
const express = require("express");
const app = express();
const { resolve } = require("path");
const bodyParser = require("body-parser");
const path = require("path");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

app.use(express.static("../client"));
// Use JSON parser for all non-webhook routes
app.use((req, res, next) => {
  if (req.originalUrl === "/webhook") {
    next();
  } else {
    bodyParser.json()(req, res, next);
  }
});

let port = process.env.PORT;

// app.post('/create-checkout-session', async (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         quantity: req.body.quantity,
//         // price_data: , variable price
//         price: "price_1JQzhbHegBXMg0ahcQVD9DBI",
//       },
//     ],
//     payment_method_types: ["card"],
//     mode: "payment",
//     success_url: `http://localhost:4242/success?id={CHECKOUT_SESSION_ID}`,
//     cancel_url: `http://localhost:4242/cancel`,
//   });
// res.redirect(303, session.url)

// })

//Working version

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "gbp",
          unit_amount: 2000,
          product_data: {
            name: "T-shirt",
            // description: "", cake it or leave it description
            // images: [], cake it or leave it logo
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `http://localhost/success.html`,
    cancel_url: `http://localhost/cancel.html`,
  });
  res.redirect(303, session.url);
});

// CURL -X POST http://localhost:4242/create-checkout-session -D '{"quantity": 1}' -H "Content-Type: application/json"

// Stripe requires the raw body to construct the event
app.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
      // On error, log and return the error message
      console.log(`❌ Error message: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Successfully constructed event
    console.log("✅ Success:", event.id);

    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
  }
);

app.listen(4242, () => console.log(`Node server listening on port ${port}!`));
