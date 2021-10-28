export const urlApi = `http://localhost:3000/api/products`;
// recuperation produits API
export function getKanapsFromApi(url) { // recupère les produits 
    return new Promise((fonction) => { // retourne une promesse a la fonction 
        fetch (url).then(res => { // appel API 
            if (res.ok) { return res.json()}  // si obtenu, reour au format JSON 
        })
        .then(result => fonction(result))// renvoi le resultat dans cette fonction en argument
    })
}

//affichage de tous les produits
export function displayListProducts (result) { 
    let listProducts = result;
    listProducts.forEach(prod => {       // boucle pour création html de chaque produit          
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

//affichage d'un seul produit
export function displayProduct(prod) {
    let img  = document.createElement("img"); 
    document.querySelector('.item__img').append(img);  
    //intégrer les attributs
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

// création d une class prod 
export class prod {
    constructor(productId,color,quantity,price) {
        this.productId = productId;
        this.color = color;
        this.quantity = quantity;
        this.price = price; 
    }
}

// suppression d un article
export function deleteArticle(cart) {
    var art = document.getElementsByClassName('deleteItem');
    for(var i = 0; i < art.length; i++) {
        (function(index) {
            art[index].addEventListener("click", () => {
                let deleteItem = art[index].closest("article");
                let indexDeleteItem = deleteItem.dataset.index;
                cart.splice(indexDeleteItem, 1 );
                localStorage.setItem("cart", JSON.stringify(cart)); 
                cart = JSON.parse(localStorage.getItem("cart"));
                location.reload();     
            })
        })(i);
    }
}

//changement quantité
export function quantityChange(cart) {
    var qte = document.getElementsByClassName('itemQuantity');
    for(var i = 0; i < qte.length; i++) {
        (function(index) {
            qte[index].addEventListener("change", (e) => {
                let qteItem = qte[index].closest("article");
                let indexQteItem = qteItem.dataset.index;
                cart[indexQteItem].quantity = e.target.value;
                localStorage.setItem("cart", JSON.stringify(cart)); 

                quantityTotal();
                priceTotal(cart);
            })
        })(i);
    }
}

//calcul de la quantité
export function quantityTotal() {
    let qte = document.getElementsByClassName('itemQuantity');
    let qteTotal = 0 ;
    for(var i = 0; i < qte.length; i++) {
            qteTotal += parseInt(qte[i].value);
            document.getElementById('totalQuantity').textContent = qteTotal;
    }    
}

//prix total
export function priceTotal(cart) {
    const totalPrice = cart.map(item => item.price*item.quantity).reduce((prev, curr) => prev + curr, 0);
    document.querySelector("#totalPrice").textContent = totalPrice;
}
