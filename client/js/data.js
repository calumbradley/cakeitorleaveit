let cakeData = [];
const addData = (ev) => {
     //ev.preventDefault()
    //console.log('Sucessfully prevented form submission');
    //console.log('Creating data object');
 
    let cakeShape = document.getElementsByName('cakeShape');
    for (let cake of cakeShape) {
      if (cake.checked) {
        //console.log(cake.checked);
        selCakeShape = cake.value;
        break;
      }
      else
        selCakeShape = "";
    }
 
    if (icingSugar() === 5) {icing = true}
    else {icing = false}
 
 
    let data =
    {
        UniqueId: Date.now(),
        cakeSize : parseInt(document.getElementById('cakeSize').value),
        cakeShape : selCakeShape,
        sponge : document.getElementById('sponge').value,
        butterCream: document.getElementById('buttercream').value,
        icing: icing,
        specialDecoration: document.querySelector("#decorationRequirements").value,
        cakeMessage: document.querySelector("#specifyCakeMessage").value,
        dateTime: document.querySelector("#dateAndTimeReq").value,
        price: calculateTotal()
    }
    //console.log(`Customers unique ID is : ${data.id}`);
    //console.log(`Customers name is : ${data.name}`);
    //console.log('Putting the data taken into an array');
   
    
    cakeData.push(data)
   
    localStorage.setItem('cakeData', JSON.stringify(cakeData));
   
    //add back to force post the form
    //document.querySelector('form').submit()
 
    let options =
{
  method: 'POST',
  headers:
  {
    'Content-Type': 'application/json; charset=utf-8'
  }
  ,
  body: JSON.stringify(cakeData) 
}
 
//Req - Represents a resource request.
//Res - Represents the response to a request.
 
fetch('/create-checkout-session', options)
.then(res => { if (res.ok) {console.log('Success', res)}})
  .then(data => data).then(console.log(data))

  cakeData.shift(data);
 
//   document.querySelector('form').reset()
document.querySelector('form').submit
}

document.querySelector("#submitButton").addEventListener('click', addData);

// [0].price_data.unit_amount