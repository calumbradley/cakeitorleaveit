require("dotenv").config({ path: "../.env" });
const express = require("express");
const app = express();
const { resolve } = require("path");
const path = require("path");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const session = require('express-session')

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //Used to parse JSON bodies
app.use(express.static("../client"));
app.use(session({ secret: 'some session', cookie: { maxAge: 60000 }}))


let port = process.env.PORT;

// CURL -X POST http://localhost:4242/create-checkout-session -D '{"quantity": 1}' -H "Content-Type: application/json"

app.post("/create-checkout-session", async (req, res) => {

   let session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "gbp",
          unit_amount: 1000,
          product_data: {
            name: "CakeItOrLeaveIt",
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

//Testing Route

// app.post("/test", (req, res) => {
//   console.log(req.body.price);
//   res.send("POST request");
// });

app.listen(4242, () => console.log(`Node server listening on port ${port}!`));
