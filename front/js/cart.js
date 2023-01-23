let tableauLocalStorage = []
if (localStorage.getItem("listeCanape")!== null) { //(!== -> "différent de")
  //déja quelque chose dans localstorage
  tableauLocalStorage = JSON.parse(localStorage.getItem('listeCanape'))
}


itemInCart()
function itemInCart (){

let elementsInCart = document.getElementById("cart__items");
for (let product of tableauLocalStorage){ 
  fetch (`http://localhost:3000/api/products/${product.id}`)
  .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
  .then(function(kanap) {
    product.price = kanap.price //pour faire entrer kanap.price dans tableauLocalStorage sous forme de product.price
    elementsInCart.innerHTML +=
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
                </article>`


              

// let newQuantity = document.querySelector("input[value]");
// newQuantity.addEventListener('change', () => {
// console.log(testQty)
// console.log(newQuantity.value)
              
// })
})
  

}}



console.log(tableauLocalStorage)
 //-------------------------------POUR CALCULER LE NOMBRE TOTAL D'ARTICLE DU PANIER----------------------------------------
let numberTotalOfCart = [];
for (let m = 0; m < tableauLocalStorage.length; m++){
  let numberInCart = tableauLocalStorage[m].qty;
  numberTotalOfCart.push(numberInCart)
  console.log(numberTotalOfCart);
}

 
//----------------ADDITIONNER LES ARTICLES DU PANIER AVEC LA METHODE reduce -----------------------
 const reducer = (accumulator, currentValue) => accumulator + currentValue;
 const totalArticle = numberTotalOfCart.reduce(reducer,0);
 console.log(totalArticle);

 let priceTotalOfCart = [];
for (let p = 0; p < tableauLocalStorage.length; p++){
  let priceInCart = tableauLocalStorage[p].price;
  console.log(priceInCart); // Pourquoi le price est considéré comme indefined, pourtant ils ont été rajoutés dans l'array des article dans le panier 
  //on le voit avec le console.log(tableauLocalStorage à la ligne 60)
}
let finalNumber = document.getElementById("totalQuantity");
finalNumber.innerHTML += `<span id="totalQuantity">${totalArticle}`



//-----------------------------partie données utilisateur du formulaire------------------------------------

const btnOrder = document.querySelector("#order");
btnOrder.addEventListener("click", (e)=> {
e.preventDefault();

let userinformations = {
fistname : document.querySelector("#firstName").value,
lastname : document.querySelector("#lastName").value,
address : document.querySelector("#address").value,
city : document.querySelector("#city").value,
email: document.querySelector("#email").value
}

localStorage.setItem("userinformations", JSON.stringify(userinformations))

//mettre la commande finale dans une variable à envoyer au server pour la confirmation de la commande
let finalcommand = {
  
  products: tableauLocalStorage,
  contact : userinformations
}
console.log("finalcommand");
console.log(finalcommand)
})


































// let changeQuantity = document.querySelector("itemQuantity");
// changeQuantity.addEventListener("change", function () {

  
//     console.log(changeQuantity.value);

//   })

