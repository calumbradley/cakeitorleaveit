const addData = (ev) => {
  //ev.preventDefault();
  //console.log('Sucessfully prevented form submission');
  //console.log('Creating data object');

  // let cakeShape = document.getElementsByName("cakeShape");
  // for (let cake of cakeShape) {
  //   if (cake.checked) {
  //     //console.log(cake.checked);
  //     selCakeShape = cake.value;
  //     break;
  //   } else selCakeShape = "";
  // }

  // if (icingSugar() === 5) {
  //   icing = true;
  // } else {
  //   icing = false;
  // }

  let data = {
    // UniqueId: Date.now(),
    // cakeSize: parseInt(document.getElementById("cakeSize").value),
    // cakeShape: selCakeShape,
    // sponge: document.getElementById("sponge").value,
    // butterCream: document.getElementById("buttercream").value,
    // icing: icing,
    // specialDecoration: document.querySelector("#decorationRequirements").value,
    // cakeMessage: document.querySelector("#specifyCakeMessage").value,
    // dateTime: document.querySelector("#dateAndTimeReq").value,
    price: calculateTotal() * 1000,
  };
  //console.log(`Customers unique ID is : ${data.id}`);
  //console.log(`Customers name is : ${data.name}`);
  console.log(data.price);

  localStorage.setItem("cakeData", JSON.stringify(data));

  //add back to force post the form
  //document.querySelector('form').submit()

  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  delete data.price;

  fetch("/create-checkout-session", options)
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  //document.querySelector('form').reset()
  //document.querySelector('form').submit
};

document.querySelector("#submitButton").addEventListener("click", addData);
