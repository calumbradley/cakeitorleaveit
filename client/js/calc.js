let cakePrices = new Array();

cakePrices[6] = 4;
cakePrices[8] = 8;
cakePrices[10] = 12;
cakePrices[12] = 15;

function getCakeSizePrice() {
  let cakeSizeEle = document.getElementById("cakeSize");
  return cakePrices[cakeSizeEle.value];
}

function cakeShape() {
  let cakeShape = [];

  cakeShape["round"] = 10;
  cakeShape["square"] = 15;

  let cakeShapePrice = 0;
  let cakeShapesEle = document.getElementsByName("cakeShape");
  for (let i = 0; i < cakeShapesEle.length; i++) {
    if (cakeShapesEle[i].checked) {
      cakeShapePrice = cakeShape[cakeShapesEle[i].value];
      break;
    }
  }
  return cakeShapePrice;
}

let spongePrices = new Array();

spongePrices["plain"] = 3;
spongePrices["lemon"] = 4;
spongePrices["chocolate"] = 4.5;
spongePrices["carrotCake"] = 5;
spongePrices["otherSpongeFlavour"] = 10;

function spongePrice() {
  let spongeEle = document.getElementById("sponge");
  // console.log(spongeEle);
  // console.log(spongePrices);
  // console.log(spongeEle.value);
  return spongePrices[spongeEle.value];
}

let butterCream = [];

butterCream["vanilla"] = 1;
butterCream["chocolate"] = 2;
butterCream["vanillaCreamCheese"] = 3;
butterCream["lemon"] = 2;
butterCream["lemonCurd"] = 3;

function getButterCream() {
  let butterCreamEle = document.getElementById("buttercream");
  return butterCream[butterCreamEle.value];
}

function icingSugar() {
  let eleIceSugar = document.getElementById("icing");
  let icingSugar = 0;

  if (eleIceSugar.checked === true) {
    icingSugar = 5;
  } else {
    icingSugar = 0;
  }

  return icingSugar;
}

function decoration() {
  let eleDecoration = document.getElementById("dec");
  let decoration = 0;

  if (eleDecoration.checked === true) {
    decoration = 5;
  } else {
    decoration = 0;
  }

  return decoration;
}
function getdelorcol() {
  let delivery = document.getElementById("delivery");
  let collection = document.getElementById("collection");
  let delcolprice = 0;

  if (delivery.checked === true) {
    delcolprice = 4.95;
  }

  if (collection.checked === true) {
  }

  return delcolprice;
}

function calculateTotal() {
  let cakePrice =
    getCakeSizePrice() +
    spongePrice() +
    cakeShape() +
    icingSugar() +
    decoration() +
    getButterCream() +
    getdelorcol();

  let price = document.getElementById("price");

  price.innerHTML = "£" + cakePrice;

  return cakePrice;
}
