let params = (new URL(document.location)).searchParams;
let orderId = params.get("orderId");
console.log(orderId);

let displayTheOrder = document.getElementById('orderId');
displayTheOrder.innerHTML = orderId
