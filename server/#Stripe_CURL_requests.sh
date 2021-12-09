#Stripe CURL requests
#Create a sesssion

curl https://api.stripe.com/v1/checkout/sessions \
  -u sk_test_51J83vBHegBXMg0ahTAJgRCyO9sh1Tr6b03gcedOp90BpS87YlKxTLQhcZdRyhmHIMOicCESKfZcjFfPAPdsspfYM00x4wP30Y8: \
  -d success_url="https://example.com/success" \
  -d cancel_url="https://example.com/cancel" \
  -d "line_items[0][price]"=price_1JQzhbHegBXMg0ahcQVD9DBI \
  -d "line_items[0][quantity]"=1 \
  -d mode=payment

  #Retrive a session

curl https://api.stripe.com/v1/checkout/sessions/cs_test_a1VD9tdE6vWm5LgxwmW3RtSzpnaGRzN9Ip7xqqfYlfC4QFinAE0EGXQaxl \
-u sk_test_51J83vBHegBXMg0ahTAJgRCyO9sh1Tr6b03gcedOp90BpS87YlKxTLQhcZdRyhmHIMOicCESKfZcjFfPAPdsspfYM00x4wP30Y8:

#line items

curl https://api.stripe.com/v1/checkout/sessions/cs_test_a1VD9tdE6vWm5LgxwmW3RtSzpnaGRzN9Ip7xqqfYlfC4QFinAE0EGXQaxl/line_items \
  -u sk_test_51J83vBHegBXMg0ahTAJgRCyO9sh1Tr6b03gcedOp90BpS87YlKxTLQhcZdRyhmHIMOicCESKfZcjFfPAPdsspfYM00x4wP30Y8:

  #CURL my server

curl -X POST http://localhost:4242/create-checkout-session \
-d '{
  "price_data": {
    "currency": "gbp",
    "product_data": {
      "name": "test"
    },
    "unit_amount": 500
  },
  "quantity": 1
}' \
-H "Content-Type: application/json"