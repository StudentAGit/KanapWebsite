let arrayProducts = [];
if (localStorage.getItem("listCouch")!== null) {
  arrayProducts = JSON.parse(localStorage.getItem("listCouch"))
}



function totalQuantityAndPrice(){
  let numberTotalOfCart = [];
  for (let item of arrayProducts){
    let numberInCart = item.qty;
    numberTotalOfCart.push(numberInCart)
  }
  console.log(numberTotalOfCart);

  const calculQty = (accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue);
  let totalArticle = numberTotalOfCart.reduce(calculQty,0);

  if (numberTotalOfCart.length == 0){
    totalArticle = 0
  }

  let finalQuantity = document.getElementById("totalQuantity");
  finalQuantity.innerHTML = totalArticle

  let totalPrice = 0
   for (let couch of arrayProducts){
    totalPrice += couch.qty*couch.price

   }
    let finalPrice = document.getElementById("totalPrice");
    finalPrice.innerHTML = totalPrice
}

function ModificationQuantity () {
  let input = document.querySelector(".itemQuantity");
    let updateQuantity = input.addEventListener("change", (e)=> {
        e.preventDefault();
        let newValue = document.querySelector(".itemQuantity").value;
        console.log(newValue);
        let itemToUpdate = arrayProducts.find(product => product.id === canapId && product.color === canapColor);
        let temp = JSON.parse(localStorage.getItem("listCouch"));
        let test6 = temp.find(product => product.id === canapId && product.color === canapColor);

        

        console.log(itemToUpdate);
        itemToUpdate.qty = Number(newValue);
        test6.qty = Number(newValue);
        localStorage.setItem("listCouch",JSON.stringify(temp));
        totalQuantityAndPrice();
      })
}

function DeleteProduct (){
  let deleteBtn = divElement.querySelector(".deleteItem");
  deleteBtn.addEventListener("click", (e) => {
    e.preventDefault;
    let article = divElement.querySelector(".cart__item");
    article.remove();
    arrayLocalStorage.filter(item => item.color !== el.dataset.color);
    localStorage.setItem("listCouch", JSON.stringify(arrayLocalStorage))  
  });
}




 
 displayCartItem()
 async function displayCartItem (){

  // totalQuantityAndPrice ();
  
 let elementsInCart = document.getElementById("cart__items");
 for (let product of arrayProducts){ 
    await fetch (`http://localhost:3000/api/products/${product.id}`)
      .then(function(res) {
            if (res.ok) {
              return res.json();
            }
          })
        .then((kanap) => {
          product.price = kanap.price; 
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
                    ModificationQuantity(divElement);
                    });
  }  
 totalQuantityAndPrice ();
 

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
        for(let test of arrayProducts){
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

  