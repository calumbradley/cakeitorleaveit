const stripe = Stripe(
  "pk_test_51J83vBHegBXMg0ahtceAMDKDcXjEMfTF39tmZIqFBZu3HKZJXgdkEag54ilUio6y8mijVWmj3OoCb4AhmGpEpR2W00V5pDelfY"
);

const sendData = (ev) => {
  //ev.preventDefault();

  let price = calculateTotal() * 100;

  // localStorage.setItem("cakeData", JSON.stringify(data));

  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: [
        {
          id: 1,
          quantity: 1,
          price: price,
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
