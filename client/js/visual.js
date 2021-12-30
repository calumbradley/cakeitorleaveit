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
    document.querySelector("#decorationRequirements").style.display = "block";
  } else {
    document.querySelector("#decorationRequirements").style.display = "none";
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

let currentdate = new Date();
let plus7date = new Date();
plus7date.setDate(plus7date.getDate() + 7);
let yyyymmddplus7 = plus7date.toISOString().split("T")[0]; 

document.getElementById("year").innerHTML = currentdate.getFullYear();

document.getElementById("dateReq").setAttribute("min", yyyymmddplus7);
