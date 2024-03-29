// Récupération du local storage grâce à l'array des produits "cartProducts"
let cartProducts = [];

if (localStorage.getItem("listCouch")!== null) {
  cartProducts = JSON.parse(localStorage.getItem("listCouch"))
} else{
  totalQuantityAndPrice ();
}

// Fonction pour le calcul de la quantité et du prix final de la commande à chaque modification du local storage
function totalQuantityAndPrice(){
  let numberTotalOfCart = [];
  for (let item of cartProducts){
    let numberInCart = item.qty;
    numberTotalOfCart.push(numberInCart)
  }
 
  const calculQty = (accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue);
  let totalArticle = numberTotalOfCart.reduce(calculQty,0);

  if (numberTotalOfCart.length == 0){
    totalArticle = 0
  }

  let finalQuantity = document.getElementById("totalQuantity");
  finalQuantity.innerHTML = totalArticle

  let totalPrice = 0
  for (let couch of cartProducts){
    totalPrice += couch.qty*couch.price

  }
  let finalPrice = document.getElementById("totalPrice");
  finalPrice.innerHTML = totalPrice
}

//Fonction permettant l'affichage des éléments du local storage
displayCartItem()
async function displayCartItem (){

  let sectionCart = document.getElementById("cart__items");
  for (let product of cartProducts){ 
    await fetch (`http://localhost:3000/api/products/${product.id}`)
      .then(function(res) {
            if (res.ok) {
              return res.json();
            }
          })
        .then((kanap) => {
          console.log(kanap)
           product.price = kanap.price; 
          let article = document.createElement("article");
          article.innerHTML +=
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
                    sectionCart.appendChild(article);
                    
                    
                      let el = article.querySelector(".cart__item")
                      let canapId = el.dataset.id;
                      let canapColor = el.dataset.color;

                     // Partie permettant la suppresion des articles
                          let deleteBtn = article.querySelector(".deleteItem");
                          deleteBtn.addEventListener("click", (e) => {
                          e.preventDefault;
                          article.remove();
                          cartProducts = cartProducts.filter(item => item.color !== el.dataset.color)
                          localStorage.setItem("listCouch", JSON.stringify(cartProducts))
                          totalQuantityAndPrice ();
                          });
                    
                          totalQuantityAndPrice ();
                    
                          //Partie permettant la modification de la quantité
                          let input = article.querySelector(".itemQuantity");
                           input.addEventListener("change", (e)=> {
                             e.preventDefault();
                             let newValue = input.value;
                             console.log(newValue);
                             if (newValue > 100 || newValue < 1){
                               alert("Veuillez choisir une quantité comprise entre 1 et 100 !")
                             }
                            if (localStorage.getItem("listCouch")!== null) {
                              let storage = JSON.parse(localStorage.getItem("listCouch"))
                               
                              let inStorage = storage.find(item => item.id === canapId && item.color === canapColor);
                              let itemToUpdate = cartProducts.find(product => product.id === canapId && product.color === canapColor);
                              console.log(itemToUpdate);
                              itemToUpdate.qty = Number(newValue);
                              inStorage.qty = Number(newValue);
                              let replaceOldValueStorage = storage.filter(product => product.qty !== newValue)
                              let replaceOldValueCart = cartProducts.filter(product => product.qty !== newValue)
                              cartProducts = replaceOldValueCart
                              inStorage = replaceOldValueStorage
                              localStorage.setItem("listCouch",JSON.stringify(inStorage))
                              totalQuantityAndPrice();
                            } 
                        })
                        totalQuantityAndPrice();
                    });              
  }  
}
    

//-----------------------------PARTIE DONNEES UTILISATEUR POUR LE FORMULAIRE------------------------------------
//3 fonctions pour le contôle des champs du formulaire
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
     alert("Adresse non valide")
  return false;
  }
}

function emailControl(theEmail){

  if (/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(theEmail)){
    return true;
  }
  else {
  alert("Adresse email invalide")
  return false;
  }
}

// ENVOIE DES DONNEES AU SERVEUR
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

     if (textControl(userinformations.firstName) === true && textControl(userinformations.lastName) === true && textControl(userinformations.city) === true && addressControl(userinformations.address) === true && 
        emailControl(userinformations.email) === true){
        localStorage.setItem("userinformations", JSON.stringify(userinformations))
        
        
        let tabIdCouch = []
        for(let test of cartProducts){
          tabIdCouch.push(test.id)
          console.log(test)
        }

        let finalcommand = {
          
          products: tabIdCouch,
          contact : userinformations
        }

        //Requête avec la méthode POST pour l'envoi des données au serveur
    
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
  



  