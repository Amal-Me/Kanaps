import * as module from './module.js';

//récupération de l'URL de la page
const url = new URLSearchParams(location.search);
// extraction du ID param
const _id = url.get('_id');
let urlKanaps = `${module.urlApi}/${_id}`;

//appel API et affichage d'un seul produit
module.fetchApi(urlKanaps)
.then(result => displayProduct(result))
.catch(() =>    // exécute si erreur
    document.querySelector('section').innerHTML = 
        "<h2>Oups... Désolé un problème est survenu, merci de réessayer plus tard </h2>"
)

//affichage d'un seul produit
function displayProduct(prod) {
    let img  = document.createElement("img"); 
    document.querySelector('.item__img').append(img);  
    
    img.setAttribute   ("src", prod.imageUrl);
    img.setAttribute   ("alt", prod.altTxt);
    //insertion de contenu
    document.getElementById("title").textContent           = prod.name;        
    document.getElementById("price").textContent           = prod.price;
    document.getElementById("description").textContent     = prod.description;
    // boucle colors
    for (let i = 0; i < prod.colors.length; i++ ) { 
        let option = document.createElement("option"); // création de l'élément option
        document.getElementById("colors").append(option); // positionnement dans l ID colors
        option.setAttribute("value", prod.colors[i]); // attribut value = chaque couleur
        option.textContent = prod.colors[i]; // contenu = chaque couleur
    }
}
//ecoute du btn ajouter au panier
document.querySelector("#addToCart").addEventListener('click', () => { 
    let prod = { // création d'un nouveau produit avec récupération des valeurs
        productId:  _id,
        color    : document.querySelector("#colors").options[document.querySelector("#colors").selectedIndex].value,
        quantity : document.querySelector("#quantity").value,
        price    : document.querySelector("#price").innerHTML
    }
    let cart = JSON.parse(localStorage.getItem("cart"));// récupération du panier dans le localstorage

    //condition de sélection d'une quantité et d'une couleur pour pouvoir ajouter au panier
    if( document.querySelector("#colors").options[document.querySelector("#colors").selectedIndex].value == "" || document.querySelector("#quantity").value == "0") {
        alert("Veuillez renseigner la couleur et la quantité");
    }
        else{
        if (cart == null) { // si pas de panier
            cart = [];        
            cart.push(prod); // ajout d un produit à la suite
        } 
        else { //panier existant
            let existInCart = false;
            let indexOfDuplicate; 
            cart.forEach(item => {  
                // verification de l existance du produit dans le panier
                switch (item.color + item.productId) {
                    //recherche même couleur même id
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
        //ajout dans le localstorage
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("L'ajout au panier a bien été effectué.");
    }
}) 