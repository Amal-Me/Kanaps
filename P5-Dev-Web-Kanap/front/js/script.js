import * as module from './module.js';
let urlKanaps = module.urlApi;
//appel API et affichage de tous les produits
function getAndDisplayKanaps () {
    module.fetchApi(urlKanaps) 
    .then(result => displayListProducts(result))     
    .catch(() =>                   // exécute si erreur
        document.querySelector('section').innerHTML = 
        "<h2>Oups... Désolé un problème est survenu, merci de réessayer plus tard </h2>"
    )
}
//affichage de tous les produits
function displayListProducts (result) { 
    
    result.forEach(prod => {       // boucle pour création html de chaque produit          
        let a              = document.createElement("a");               
        let article        = document.createElement("article");
        let img            = document.createElement("img");
        let h3             = document.createElement("h3");
        let p              = document.createElement("p");

        a.setAttribute     ("href", "product.html?_id=" + prod._id);   //intégrer les attributs
        img.setAttribute   ("src", prod.imageUrl);
        img.setAttribute   ("alt", prod.altTxt);
        h3.setAttribute    ("class", "productName");
        p.setAttribute     ("class", "productDescription");
                            
        a.append           (article);   // positionnement des éléments HTML
        article.append     (img);
        article.append     (h3);
        article.append     (p);

        h3.textContent     = prod.name;                               //insertion de contenu
        p.textContent      = prod.description;

        document.getElementById('items').append(a);// placement du produit
    })
}

getAndDisplayKanaps();