// Récupération des paramètres de l'URL
let params = (new URL(document.location)).searchParams;
console.log(location)
let id = params.get('id');

// Fonction permettant de rajouter dans le panier sans écrasement et sans multiplication du meme article
function addToCart(cart,item){  
  console.log(item,cart) 
  let foundSomething = false //varaiable créée s'il y a rien dans le panier (rien trouvé dans le panier) donnée boléenne
  for (let element of cart){ 
    if (item.id === element.id && item.color === element.color ){  
      element.qty += item.qty
      foundSomething = true
    }
  }
  if (foundSomething === false) { 
    cart.push(item) 
  }
  return cart // met fin à la fonction et retourne le nouveau tableau = (mise à jour du panier)
}

// Fonction permettant l'ajout des produits au local storage
function addToStorage (id, userChoiceOption, qtyProduct) {
  let cartProducts = []
  if (localStorage.getItem("listCouch")!== null) { 
    cartProducts = JSON.parse(localStorage.getItem("listCouch")) 
  } 
    cartProducts = addToCart(cartProducts,{id:id,color:userChoiceOption,qty:parseInt(qtyProduct)})
    localStorage.setItem("listCouch",JSON.stringify(cartProducts)) 

}

//Requête à l'API pour récupérer un seul produit grâce à son id
fetch ("http://localhost:3000/api/products/"+id)
.then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })

.then(function(eachProducts) {
 console.log(eachProducts)
 
  // Affichage des éléments pour chaque produit
  let productImage = document.getElementsByClassName("item__img")[0];
  productImage.innerHTML = `<img src="${eachProducts.imageUrl}" alt="${eachProducts.altTxt}">`;

  let productTitle = document.getElementsByClassName("item__content__titlePrice")[0];
  productTitle.innerHTML = `<h1 id="title">${eachProducts.name}</h1>`
  
  let productPrice = document.getElementsByClassName("item__content__titlePrice")[0];
  productPrice.innerHTML += `<p>Prix : <span id="price">${eachProducts.price}</span>€</p>`

  
  let productDescription = document.getElementsByClassName("item__content__description__title")[0];
  productDescription.innerHTML = `<p id="description">${eachProducts.description}</p>`

  let productColor = document.getElementById("colors");
  for (let i = 0; i < eachProducts.colors.length; i++){
    productColor.innerHTML +=`<option value="${eachProducts.colors[i]}">${eachProducts.colors[i]}</option>`
  }

  // L'envoie du produit au local storage avec son id, sa couleur et sa quantité
 let btnSendToCart = document.querySelector("button");
    btnSendToCart.addEventListener("click", () =>{ 
      
      let idOfProduct = id
    
      let qtyProduct = document.getElementById("quantity").value
  
      let colorSelected = document.getElementById("colors")
      let userChoiceOption = colorSelected.value; 

      if (userChoiceOption === ""){
        alert("Veuillez choisir une couleur")
      }

      if (qtyProduct >= 1 || qtyProduct <= 100){
        addToStorage(id, userChoiceOption, qtyProduct)
      }
      else{
        alert("Veuillez choisir une quantité comprise entre 1 et 100")
      }
    
    })  
})       

