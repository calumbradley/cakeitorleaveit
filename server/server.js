require("dotenv").config({ path: "../.env" });
const express = require("express");
const app = express();
const { resolve } = require("path");
const path = require("path");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// const session = require('express-session')

// app.use(express.urlencoded({ extended: false }));
app.use(express.json()); //Used to parse JSON bodies
app.use(express.static("../client"));
// app.use(session({ secret: 'some session', cookie: { maxAge: 60000 }}))

let port = process.env.PORT;

app.post("/pay", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: req.body.items.map(({ quantity, price }) => {
      return {
        price_data: {
          currency: "gbp",
          product_data: {
            name: "CakeItOrLeaveIt",
          },
          unit_amount: parseFloat(price),
        },
        quantity: quantity,
      };
    }),
    mode: "payment",
    success_url: `http://localhost:4242/success.html`,
    cancel_url: `http://localhost:4242/cancel.html`,
  });

  res.json({ url: session.url });
  delete req.body.items
});

app.listen(4242, () => console.log(`Node server listening on port ${port}!`));
