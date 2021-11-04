require("dotenv").config({ path: "../.env" });
const express = require("express");
const app = express();
const { resolve } = require("path");
const bodyParser = require("body-parser");
const path = require("path");
const { json } = require("body-parser");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

//Working version

//const price = 5795;

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

app.post('/data', (req, res) => {
  console.log(req.body[0].price); //logs an int of 7 to the console
  res.send({message : "Successful request"})
})

let price = [{"cakePrice": 6000}]

app.post("/create-checkout-session", async (req, res) => {
 
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "gbp",
          unit_amount: price[0].cakePrice,
          //req.body[0].price, //errors with "TypeError: Cannot read properties of undefined (reading 'price')"
          product_data: {
            name: "CakeItOrLeaveIt",
            // description: "", cake it or leave it description
            // images: [], cake it or leave it logo
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `http://localhost:4242/success.html`,
    cancel_url: `http://localhost:4242/cancel.html`,
  });

  res.redirect(303, session.url);
});




app.listen(4242, () => console.log(`Node server listening on port ${port}!`));
