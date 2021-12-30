const stripe = Stripe(
  "pk_test_51J83vBHegBXMg0ahtceAMDKDcXjEMfTF39tmZIqFBZu3HKZJXgdkEag54ilUio6y8mijVWmj3OoCb4AhmGpEpR2W00V5pDelfY"
);

//get the values for the customer's address etc
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let inputAddress = document.getElementById("inputAddress");
let inputAddress2 = document.getElementById("inputAddress2");

//send data to server
const sendData = (ev) => {
  //ev.preventDefault();

  let price = calculateTotal() * 100;

  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: [
        {
          id: Date.now(),
          quantity: 1,
          price: price,
          first_name: firstName.value,
          last_name: lastName.value,
          input_address: inputAddress.value,
          input_address_2: inputAddress2.value,
        },
      ],
    }),
  };

  fetch("/pay", options)
    .then((res) => {
      if (res.ok) return res.json();
      // If there is an error then make sure we catch that
      return res.json().then((e) => Promise.reject(e));
    })
    .then(({ url }) => {
      // On success redirect the customer to the returned URL
      window.location = url;
    })
    .catch((e) => {
      console.error(e.error);
    });
};

document.querySelector("#submitButton").addEventListener("click", sendData);
