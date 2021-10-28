const url = new URLSearchParams(location.search);
const orderId = url.get('orderId');
document.querySelector("#orderId").innerHTML = orderId;