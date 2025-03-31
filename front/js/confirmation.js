const url = new URLSearchParams(location.search);
//récupération de orderId dans l'url
const orderId = url.get('orderId');
//placement du numero de commande
document.querySelector("#orderId").innerHTML = orderId;
//après confirmation nettoyage du localstorage
localStorage.clear();