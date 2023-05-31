let arrayLocalStorage = []
  if (localStorage.getItem("listCouch")!== null) { //(!== -> "différent de")
        //déja quelque chose dans localstorage
        arrayLocalStorage = JSON.parse(localStorage.getItem("listCouch"))
        
  }
  else {
    totalCart();
  }





function totalCart (){
 
  //-------------------------------RECUPERER LE NOMBRE TOTAL D'ARTICLES DU PANIER----------------------------------------
  let numberTotalOfCart = [];
  for (let m = 0; m < arrayLocalStorage.length; m++){
    let numberInCart = arrayLocalStorage[m].qty;
    numberTotalOfCart.push(numberInCart)
  }
  //console.log(numberTotalOfCart);
  //--------------------------------RECUPERER TOUS LES PRIX D'ARTICLES DU PANIER---------------------------------------
  let priceTotalOfCart = [];
    for (let p = 0; p < arrayLocalStorage.length; p++){
      let priceInCart = arrayLocalStorage[p].price;
      // console.log(priceInCart);
      priceTotalOfCart.push(priceInCart)
      //console.log(priceTotalOfCart);
    }  
  //----------------ADDITIONNER LES ARTICLES DU PANIER AVEC LA METHODE reduce ---------------------------------------------
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const totalArticle = numberTotalOfCart.reduce(reducer,0);
  //console.log(totalArticle);

  // -----------------------------------ADDITIONER TOUS LES PRIX DU PANIER--------------------------------------------
  const priceReducer = (priceAccumulator, priceCurrentValue) => priceAccumulator + priceCurrentValue;
  const totalPrice = priceTotalOfCart.reduce(priceReducer,0)
  

  let finalQuantity = document.getElementById("totalQuantity");
  //  finalsDetails.innerHTML = `<p>Total (<span id="totalQuantity">${totalArticle}</span> articles) : <span id="totalPrice">${totalPrice}</span> €</p>`
  finalQuantity.innerHTML = totalArticle

  //multiplication des quantités et des prix du panier
  let price = 0
  for (let couch of arrayLocalStorage){ 
      price += couch.qty*couch.price
      let finalPrice = document.getElementById("totalPrice");
      finalPrice.innerHTML = price
    }
}


//  function deleteInStorage (cart, item){
 
//  }
 




itemInCart()
async function itemInCart (){
  

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
     let changeInput = divElement.querySelector(".itemQuantity");

      let updateQuantity = changeInput.addEventListener("change", (e)=> {
        e.preventDefault();
         let newValue = document.querySelector(".itemQuantity").value;
        
         let finalQuantity = document.getElementById("totalQuantity");
         finalQuantity.innerHTML = newValue
         let price = 0
         price += newValue*kanap.price
         let finalPrice = document.getElementById("totalPrice");
         finalPrice.innerHTML = price
           
         let arrayLocalStorage = []
        if (localStorage.getItem("listCouch")!== null) { //(!== -> "différent de")
          //déja quelque chose dans localstorage
          arrayLocalStorage = JSON.parse(localStorage.getItem("listCouch"))
        
        }
         
        //  if (product.qty !== newValue){
        //   arrayLocalStorage = 
          
        //  }


        //  let testQuantity = arrayLocalStorage.filter(obj => obj.qty !== newValue)
        //  console.log(testQuantity);
        //  if (testQuantity = true){
        //   arrayLocalStorage.push(newValue)
        //  }
        //  return arrayLocalStorage
        // arrayLocalStorage = (arrayLocalStorage, {qty:parseInt(newValue)})
        // localStorage.setItem("listCouch", JSON.stringify(arrayLocalStorage))
        // totalCart();

        

        
          // if (localStorage.getItem("listCouch")!== null) {
          //  arrayLocalStorage = JSON.parse(localStorage.getItem("listCouch"))
          //  }

          // arrayLocalStorage.filter(test => test.qty != newValue); {
          //   arrayLocalStorage.push(newValue)
           
          // }
          
          
         

         
         
         
     //      let price = 0 
     //      price += NewValue*couch.price
     //      let finalPrice = document.getElementById("totalPrice");
     //      finalPrice.innerHTML = price
     //     
     //       // if (test => test.id === el.dataset.id && test.color === el.dataset.color && test.qty !== NewValue){
     //       //  return test = true
     //       // }
     //     //  if (test === true){
     //     //     let arrayLocalStorage = []
     //     //     if (localStorage.getItem("listCouch")!== null) { //(!== -> "différent de")
     //     //       //déja quelque chose dans localstorage
     //     //       arrayLocalStorage = JSON.parse(localStorage.getItem("listCouch"))
     //     //     }
     //     //    arrayLocalStorage = ({id:test.id,color:test.color,qty:parseInt(NewValue)})
     //     //    localStorage.setItem("listCouch",JSON.stringify(arrayLocalStorage))
     //     //   }  
     //     // 
        })  // console.log(updateLocal)
      // }
     let deleteBtn = divElement.querySelector(".deleteItem");
     deleteBtn.addEventListener("click", (e) => {
        e.preventDefault;

        let el = divElement.querySelector(".cart__item");
        el.remove();
        arrayLocalStorage = arrayLocalStorage.filter(item => item.color !== el.dataset.color);
        localStorage.setItem("listCouch", JSON.stringify(arrayLocalStorage))
        totalCart();
        //pourquoi le prix ne se retir pas sachant que je refais appelle à la fonction qui permet d'afficher le total pour
        //le panier après la remise dans le localstorage ???
     });
    















     //     // let testsupression = arrayLocalStorage.splice(0,1);
     //     // console.log(testsupression); //affiche les éléments supprimer
     //     // console.log(arrayLocalStorage); //affiche le nouveau tableu
     //   //  let deleteStorage = arrayLocalStorage.filter(item => item.id !== el.dataset.id && item.color !== el.dataset.color)
     //   //  arrayLocalStorage = deleteStorage (arrayLocalStorage,{})
     //   //  localStorage.setItem("listCouch",JSON.stringify(arrayLocalStorage))
     totalCart();


   })
 }  
      
      
      
}

                  
                    
              

                



     
  
        
        
        
        


    

    
    
         
    
    
    
   
    
    //  changeQuantity();
    //  removeProduct();  

  









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

     
    //  let divElement = document.createElement("div")
    //  itemInCart (divElement);
    //  let el = divElement.querySelector(".cart__item")
    //  let canapId = el.dataset.id
     //si le formulaire est bon, alors autorisation de mise du formulaire dans le local storage
     if (textControl(userinformations.firstName) === true && textControl(userinformations.lastName) === true && textControl(userinformations.city) === true && addressControl(userinformations.address) === true && 
        emailControl(userinformations.email) === true){
        localStorage.setItem("userinformations", JSON.stringify(userinformations))
        
        
        
    
        let finalcommand = {
          
          products: ["107fb5b75607497b96722bda5b504926"],
          contact : userinformations
        }
    
        const methodPost = fetch("http://localhost:3000/api/products/order", {
         method : "POST",
         headers: { "Content-Type":"application/json" },
         body : JSON.stringify(finalcommand),
        });
    
      
    
        methodPost.then(function(id) {
          if (id.ok) {
            return id.json();
            console.log(id)
          }
        
        })

        fetch ("http://localhost:3000/api/products/order"+ orderId)
        .then(function(res) {
          if (res.ok) {
            return res.json();
          }
        })
       
      }
    

   
    
      else{
        alert("Envoi impossible")
      }
    
    
    
    
    

    
    
    
    
    });
  

    
  


  

  

 


 




//test pour le formulaire 
// Monnom
// Monprenom
// Maville
// 12 rue Monadresse
// example@gmail.com

















// stocker l'id dans l'url pour recuper sans local storage pour la page confirmation







// let changeQuantity = document.querySelector("cart__item__content__settings__quantity input");
// changeQuantity.addEventListener("change", function () {
   
  
//     console.log(changeQuantity.value);

//   })

