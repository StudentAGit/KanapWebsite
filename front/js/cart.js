let arrayLocalStorage = []
if (localStorage.getItem("listCouch")!== null) { //(!== -> "différent de")
      //déja quelque chose dans localstorage
      arrayLocalStorage = JSON.parse(localStorage.getItem("listCouch"))
      
}


 
function displayCartItem (){

 
  console.log(arrayLocalStorage); //tableau avec le prix
  console.log(localStorage); //localstorage sans le prix
  //-------------------------------RECUPERER LE NOMBRE TOTAL D'ARTICLES DU PANIER----------------------------------------
  let numberTotalOfCart = [];
  for (let nbr of arrayLocalStorage){
    let numberInCart = nbr.qty;
    numberTotalOfCart.push(numberInCart)
  }
  // console.log(numberTotalOfCart);
  //--------------------------------RECUPERER TOUS LES PRIX D'ARTICLES DU PANIER---------------------------------------
  let priceTotalOfCart = [];
    for (let prc of arrayLocalStorage){
      let priceInCart = prc.price;
      priceTotalOfCart.push(priceInCart)
    }
  console.log(priceTotalOfCart);


  //----------------ADDITIONNER LES ARTICLES DU PANIER AVEC LA METHODE reduce ---------------------------------------------
  const reducer = (accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue);
  let totalArticle = numberTotalOfCart.reduce(reducer,0);
  console.log(totalArticle);

  // -----------------------------------ADDITIONER TOUS LES PRIX DU PANIER--------------------------------------------
  const priceReducer = (priceAccumulator, priceCurrentValue) => parseInt(priceAccumulator) + parseInt(priceCurrentValue);
  let totalPrice = priceTotalOfCart.reduce(priceReducer,0);
  console.log(totalPrice);


  for (let bruh of arrayLocalStorage){
    if (bruh.qty > 1 ){
      totalPrice = bruh.qty *bruh.price
    }
  }
  
 
  // console.log(price);
  if (numberTotalOfCart.length == 0){
    totalArticle = 0
    totalPrice = 0
  }

  

  let finalQuantity = document.getElementById("totalQuantity");
  finalQuantity.innerHTML = totalArticle

  let finalPrice = document.getElementById("totalPrice");
  finalPrice.innerHTML = totalPrice
  }







itemInCart()
async function itemInCart (){

 displayCartItem();
  

 let elementsInCart = document.getElementById("cart__items");
  for (let product of arrayLocalStorage){ 
    await fetch (`http://localhost:3000/api/products/${product.id}`)
   .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
   .then((kanap) => {
    product.price = kanap.price; //pour faire entrer kanap.price dans arrayLocalStorage sous forme de product.price
    let divElement = document.createElement("div");
    divElement.innerHTML +=
      `<article class="cart__item" data-id="${product.id}" data-color="${product.color}">
    <div class="cart__item__img">
    <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">
               </div>
               <div class="cart__item__content">
                 <div class="cart__item__content__description">
                   <h2>${kanap.name}</h2>
                   <p>${product.color}</p>
                   <p>${kanap.price}</p>
                 </div>
                 <div class="cart__item__content__settings">
                   <div class="cart__item__content__settings__quantity">
                     <p>Qté : </p>
                     <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.qty}">
                   </div>
                   <div class="cart__item__content__settings__delete">
                     <p class="deleteItem">Supprimer</p>
                   </div>
                 </div>
               </div>
               </article>`;
    elementsInCart.appendChild(divElement);

    let el = divElement.querySelector(".cart__item")
    let canapId = el.dataset.id;
    let canapColor = el.dataset.color;

    let input = divElement.querySelector(".itemQuantity");

     let updateQuantity = input.addEventListener("change", (e)=> {
      e.preventDefault();
      let newValue = divElement.querySelector(".itemQuantity").value;
      console.log(newValue);
      let itemToUpdate = arrayLocalStorage.find(product => product.id === canapId && product.color === canapColor);
      console.log(itemToUpdate);
      itemToUpdate.qty = Number(newValue);
     
      let ItemToSave = JSON.stringify(itemToUpdate)
      console.log(ItemToSave);
      localStorage.setItem("listCouch",ItemToSave);
      displayCartItem();
     
      // arrayLocalStorage = JSON.parse(localStorage.getItem("listCouch"));
      // console.log(arrayLocalStorage);
      
      
      
      // let test = arrayLocalStorage.find(product => product.id === canapId && product.color === canapColor);
      // test.qty = newValue
     //  doubler la ligne 127, modifier l'arraylocalstorage (qty) et localStorage
    //  console.log(localStorage);
    //  console.log(arrayLocalStorage);
     //  console.log(itemToUpdate);
      
       // for (let item of arrayLocalStorage){
       //   if (item.qty !== newValue){
       //    item.qty = newValue
        
         //  let finalQuantity = document.getElementById("totalQuantity");
         //  finalQuantity.innerHTML = newValue
       //   }
       // }
      //  localStorage.setItem("listCouch",JSON.stringify(test));
       displayCartItem();
     })
   
     
 
    let deleteBtn = divElement.querySelector(".deleteItem");
    deleteBtn.addEventListener("click", (e) => {
       e.preventDefault;
       el.remove();
       arrayLocalStorage = arrayLocalStorage.filter(item => item.color !== el.dataset.color);
       localStorage.setItem("listCouch", JSON.stringify(arrayLocalStorage))
       displayCartItem();
      
    });
    displayCartItem();


  })
}  
     
     
     
}

   
//-----------------------------PARTIE DONNEES UTILISATEUR POUR LE FORMULAIRE------------------------------------
function textControl(text){
  
  if (/^[A-Z-a-zàâçéèêëîïôûùüÿñæœ .-]*$/.test(text)){
    return true;
  }
  else{
    console.log(text)
    alert("Les champs Nom/prénom et ville ne doivent contenir que des lettres")
    return false;
  }
}

function addressControl(theAddress){


if (/^[0-9]|[A-Z-a-z \s àâçéèêëîïôûùüÿñæœ .-][0-9]{5}$/.test(theAddress)){ 
  return true;
}
else {
  // alert("FAUX")
  console.log(theAddress)
return false;
}
}

function emailControl(theEmail){

if (/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(theEmail)){
  return true;
}
else {
 alert("Adresse email invalide")
 console.log(theEmail)
return false;
}
}

  
 
  const btnOrder = document.querySelector(".cart__order__form");
   
   btnOrder.addEventListener("submit", (e)=> {
    e.preventDefault();
    const userinformations = {
     firstName : document.querySelector("#firstName").value,
     lastName : document.querySelector("#lastName").value,
     address : document.querySelector("#address").value,
     city : document.querySelector("#city").value,
     email: document.querySelector("#email").value
    }

     
    
     //si le formulaire est bon, alors autorisation de mise du formulaire dans le local storage
     if (textControl(userinformations.firstName) === true && textControl(userinformations.lastName) === true && textControl(userinformations.city) === true && addressControl(userinformations.address) === true && 
        emailControl(userinformations.email) === true){
        localStorage.setItem("userinformations", JSON.stringify(userinformations))
        
        
        let tabIdCouch = []
        for(let test of arrayLocalStorage){
          tabIdCouch.push(test.id)
          console.log(test)
        }

       
     
        // console.log(tabIdCouch);
        let finalcommand = {
          
          products: tabIdCouch,
          contact : userinformations
        }
    
        const methodPost = fetch("http://localhost:3000/api/products/order", {
         method : "POST",
         headers: { "Content-Type":"application/json" },
         body : JSON.stringify(finalcommand),
        });
    
      
    
        methodPost.then(function(res) {
          if (res.ok) {
            return res.json();
          }
        
        })

        .then (function(command){
          console.log(command)
          window.location.href = "http://127.0.0.1:5500/front/html/confirmation.html?orderId=" + command.orderId;
        })


       
      }
    

   
    
      else{
        alert("Envoi impossible")
      }
    
    
    
    
    

    
    
    
    
    });
  

    
  


  

  

 


 


//     {
//     

  