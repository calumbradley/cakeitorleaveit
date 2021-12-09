const sendData = (ev) => {
  //ev.preventDefault();

  let data = {
   price: calculateTotal() * 1000
  };

  // localStorage.setItem("cakeData", JSON.stringify(data));

  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };


        fetch("/pay", options)
          .then(function (response) {
            return response.json();
          })
          .then(function (session) {
            return stripe.redirectToCheckout({ sessionId: session.id });
          })
          .then(function (result) {
            // If redirectToCheckout fails due to a browser or network
            // error, you should display the localized error message to your
            // customer using error.message.
            if (result.error) {
              alert(result.error.message);
            }
          })
          .catch(function (error) {
            console.error("Error:", error);
          });

          delete data.price;

      }



 document.querySelector("#submitButton").addEventListener("click", sendData);

