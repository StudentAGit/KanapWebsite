let params = (new URL(document.location)).searchParams;
let id = params.get('id');

// va permettre de rajouter dans le panier sans écrasement et sans multiplication du meme article (avec une function )
function addToCart(cart,item){  //item c'est un nouveau truc et element c'est un truc déja présent
  console.log(item,cart) 
  let foundSomething = false //varaiable crée s'il y a rien dans le panier (rien trouvé dans le panier) donnée boléenne
  for (let element of cart){ // pour tous les éléments du panier
    if (item.id === element.id && item.color === element.color ){ //===->"identique"
      element.qty += item.qty
      foundSomething = true
    }
  }
  if (foundSomething === false) { // (!foundSomething) s'il n'y avait jamais rien eu dans le panier
    cart.push(item) //item (nouvel objet) se rajoute au panier
  }
  return cart // met fin à la fonction et retourne le nouveau tableau = (mise à jour du panier)
}

fetch ("http://localhost:3000/api/products/"+id)
.then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })

.then(function(eachProducts) {
 console.log(eachProducts)

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
   //(La propriété length du tableau permet de connaître le nombre d'arguments du tableau = 
   //sa longueur correspondant au nombre d'arguments donnés.)
 }
})         

//récupérer les données pour les envoyer dans le local storage (on le voit avec les console.log) 
 //avec addEventListener au clique du bouton  "ajouter au panier" 
 let btnSendToCart = document.querySelector("button");

 btnSendToCart.addEventListener("click", () =>{ 
  
 let idOfProduct = id
 console.log(idOfProduct);
 
 let qtyProduct = document.getElementById("quantity").value;
 console.log(qtyProduct);

 let colorSelected = document.getElementById("colors");
 let userChoiceOption = colorSelected.value; //Mettre le choix de l'utilisateur dans une variable
 console.log(userChoiceOption)

 
  if (qtyProduct <= 100 && qtyProduct >0){
    let arrayProducts = []
    if (localStorage.getItem("listCouch")!== null) { //(!== -> "différent de") si y'a déjà quelque chose dans localstorage
      arrayProducts = JSON.parse(localStorage.getItem("listCouch")) //convertit du JSON en javascript
    } 
      arrayProducts = addToCart(arrayProducts,{id:id,color:userChoiceOption,qty:parseInt(qtyProduct)})
      localStorage.setItem("listCouch",JSON.stringify(arrayProducts)) //convertit une valeur javascript en chaine JSON.
  } else {
   alert ("Veuillez choisir une quantité comprise entre 1 et 100")
  }
  


 })











 


   

   
   
  