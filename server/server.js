require("dotenv").config({ path: "../.env" });
const express = require("express");
const app = express();
const { resolve } = require("path");
const path = require("path");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.static("../client"));

let port = process.env.PORT;

// CURL -X POST http://localhost:4242/create-checkout-session -D '{"quantity": 1}' -H "Content-Type: application/json"

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "gbp",
          unit_amount: 1000,
          //errors with "TypeError: Cannot read properties of undefined (reading 'price')"
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

  // console.log(req.body[0]);
  
  console.log(session.url, session.line_items)
  res.redirect(303, session.url);
});

app.listen(4242, () => console.log(`Node server listening on port ${port}!`));
