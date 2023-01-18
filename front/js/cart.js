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
`<article class="cart__item" data-id=">${product.id}" data-color="${product.color}">
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

  })
  

}}
  
console.log(tableauLocalStorage)

//------------------------------ Pour modifier la quantité d'un produit du panier----------------------------------------

let changeQuantity = document.querySelector("itemQuanty");
changeQuantity.addEventListener("change", () => {
tableauLocalStorage.qty = newQuantity
console.log(newQuantity);


})
//Pour supprimer un ou plusieurs produits du panier produit
// let btnDelete = document.querySelectorAll("deleteItem");
// btnDelete.addEventListener ("click", () => {
//   localStorage.removeItem("liste")
// })

// function totalCalcul () {
// let totalPrice = []
// for (let prix in price){
// console.log(prix)
// }
// } 
 
// let totalPrice = document.getElementsByClassName("cart__price");
//    for (let element of tableauLocalStorage){
//     element.qty + element.qty && element.price + element.price
//    total.innerHTML += `<p>Total (<span id="totalQuantity">${totalCalcul.price}</span> articles) : <span id="totalPrice">${totalCalcul.totalPrice}</span> €</p>`
//    }
   



// for (let i = 0; i < deleteProduct.length; i++){
//  btnDelete[i].addEventListener("click", (event) =>{
//  event.preventDefault ()
//  console.log(event);
 
//  }
// )}


// }






















//-----------------------------partie données utilisateur du formulaire------------------------------------

































// let changeQuantity = document.querySelector("itemQuantity");
// changeQuantity.addEventListener("change", function () {

  
//     console.log(changeQuantity.value);

//   })

