// Récupération des paramètres de l'URL pour "orderId"
let params = (new URL(document.location)).searchParams;
let orderId = params.get("orderId");
console.log(orderId);

// Affichage du numéro de commande
let displayTheOrder = document.getElementById('orderId');
displayTheOrder.innerHTML = orderId
