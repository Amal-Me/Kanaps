const url = new URLSearchParams(location.search);
const orderId = url.get('orderId');
document.querySelector("#orderId").innerHTML = orderId;//placement du numero de commande
localStorage.clear();//après confirmation nettoyage du localstorage