import * as module from './module.js';
const url = new URLSearchParams(location.search);//récupération de l'URL de la page
const _id = url.get('_id');// extraction du ID param
let urlKanaps = `${module.urlApi}/${_id}`;

//appel API et affichage d'un seul produit
module.getKanapsFromApi(urlKanaps)
.then(result => module.displayProduct(result))
.catch(err => {   // exécute si erreur
    document.querySelector('section').textContent =                         
    "Oups... Désolé un problème est survenu, merci de réessayer plus tard";
    document.querySelector('section').style.fontSize = '24px';
})

//ecoute du btn ajouter au panier
document.querySelector("#addToCart").addEventListener('click', () => { 
    let prod = new module.prod( // création d'un nouveau produit
        _id,
        document.querySelector("#colors").options[document.querySelector("#colors").selectedIndex].value,
        document.querySelector("#quantity").value,
        document.querySelector("#price").innerHTML
    )
    let cart = JSON.parse(localStorage.getItem("cart"));// récupération du panier dans le localstorage
    
    if (cart == null) { // si pas de panier
        cart = [];        
        cart.push(prod); // ajout d un produit à la suite
    } 
    else { //panier existant
        let existInCart = false;
        let indexOfDuplicate; 
        cart.forEach(item => {         // verification de l existance du produit dans le panier
            switch (item.color + item.productId) {
                case prod.color + prod.productId:
                    existInCart = true;
                    indexOfDuplicate = cart.indexOf(item); // récupération de l'index du produit identique                     
            }
        } )         
        if (existInCart) { // si 'true' ajout uniquement de la quantité
            cart[indexOfDuplicate].quantity = +cart[indexOfDuplicate].quantity + +prod.quantity;
        } 
        else { // si 'false' ajout d un produit
            cart.push(prod);
        } 
    }
    localStorage.setItem("cart", JSON.stringify(cart));//ajout dans le localstorage
    alert("L'ajout au panier a bien été effectué.");
}) 
