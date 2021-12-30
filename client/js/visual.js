document.querySelector("#sponge").onchange = () => {
  otherFlavourEle();
};

let otherFlavourEle = () => {
  let otherFlavourEle = document.getElementById("otherFlavour");

  if (document.querySelector("#sponge").value === "otherSpongeFlavour") {
    otherFlavourEle.style.display = "block";
  } else {
    otherFlavourEle.style.display = "none";
  }
};

document.querySelector("#dec").onchange = () => {
  decText();
};

let decText = () => {
  if (document.getElementById("dec").checked === true) {
    document.querySelector("#decorationRequirements").style.display =
      "block";
  } else {
    document.querySelector("#decorationRequirements").style.display =
      "none";
  }
};

document.querySelector("#cakeMessage").onchange = () => {
  cakeMessage();
};

let cakeMessage = () => {
  // let otherFlavourEle = document.querySelector("#cakeMessage");

  if (document.querySelector("#cakeMessage").checked === true) {
    document.querySelector("#specifyCakeMessage").style.display = "block";
  } else {
    document.querySelector("#specifyCakeMessage").style.display = "none";
  }
};

   let dateTime = new Date();

   document.getElementById('dateTime').innerHTML = dateTime.getFullYear();
