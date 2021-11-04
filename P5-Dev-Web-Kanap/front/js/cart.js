import * as module from './module.js';
// recuperation du panier
let cart = JSON.parse(localStorage.getItem("cart"));
let products = [];
let contact = {};


//creation des articles et placement
function display() {
    cart.forEach(product => {
        let article     = document.createElement("article");
        let div1        = document.createElement("div");
        let img         = document.createElement("img");
        let div2        = document.createElement("div");
        let div2_1      = document.createElement("div");
        let h2          = document.createElement("h2");
        let p2_1        = document.createElement("p");
        let div2_2      = document.createElement("div"); 
        let div2_2_1    = document.createElement("div");
        let p2_2_1      = document.createElement("p");
        let input2_2_1  = document.createElement("input");
        let div2_2_2    = document.createElement("div");
        let p2_2_2      = document.createElement("p");
        let p2_2_0      = document.createElement("p");

        article.className   = "cart__item";
        article.setAttribute ("data-id", product.productId);
        article.setAttribute ("data-index", cart.indexOf(product));
        div1.className      = "cart__item__img";
        div2.className      = "cart__item__content";
        div2_1.className    = "cart__item__content__titlePrice";
        p2_1.className      = "price";
        div2_2.className    = "cart__item__content__settings";
        div2_2_1.className  = "cart__item__content__settings__quantity";
        div2_2_2.className  = "cart__item__content__settings__delete";
        input2_2_1.className= "itemQuantity";
        input2_2_1.type     = "number";
        input2_2_1.name     = "itemQuantity";
        input2_2_1.min      = "1";
        input2_2_1.max      = "100";
        input2_2_1.value    = product.quantity;
        p2_2_2.className    = "deleteItem";
        p2_2_1.textContent  = "Qté : ";
        p2_2_2.textContent  = "Supprimer";
        p2_2_0.textContent  = product.color;

        document.getElementById("cart__items").append(article);
            article.append(div1);
                div1.append(img);
            article.append(div2);
                div2.append(div2_1);
                    div2_1.append(h2);
                    div2_1.append(p2_1);
                div2.append(div2_2);
                    div2_2.append(p2_2_0);
                    div2_2.append(div2_2_1);
                        div2_2_1.append(p2_2_1);
                        div2_2_1.append(input2_2_1);
                    div2_2.append(div2_2_2);
                        div2_2_2.append(p2_2_2);

    let urlKanap = `${module.urlApi}/${product.productId}`;
    module.fetchApi(urlKanap)
    .then(result => {
            img.src = result.imageUrl;
            img.alt = result.altTxt;
            h2.textContent     = result.name;
            p2_1.textContent   = result.price + ',00 €';
    })
    .catch(() => 
        document.querySelector('section').innerHTML = 
        "<h2>Oups... Désolé un problème est survenu, merci de réessayer plus tard </h2>"
    )
}) 
}

// suppression d un article
function deleteArticle(cart) {
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
function quantityChange(cart) {
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
function quantityTotal() {
    let qte = document.getElementsByClassName('itemQuantity');
    let qteTotal = 0 ;
    for(var i = 0; i < qte.length; i++) {
            qteTotal += parseInt(qte[i].value);
            document.getElementById('totalQuantity').textContent = qteTotal;
    }    
}

//prix total
function priceTotal(cart) {
    const totalPrice = cart.map(item => item.price*item.quantity).reduce((prev, curr) => prev + curr, 0);
    document.querySelector("#totalPrice").textContent = totalPrice;
}

if( cart = null || (cart = [])){
    document.querySelector("h1").innerHTML = "<h1>Votre panier est vide</h1>"
}else {
    display();
    deleteArticle(cart);//suppression article
    quantityChange(cart);//changement quantité
    quantityTotal();//calcul quantité total
    priceTotal(cart);//calcul prix total
}

//verif panier
function verifCart() {
    if(cart.length < 1 || cart == null){
        alert("Panier vide");
        return false;
    }else{
        cart.forEach(prod => products.push(prod.productId));//envoi de l id dans le []       
        return true;
    }
}
//verif formulaire
function verifInput() {    
    let verifNumber = /[0-9]/;
    let verifSpecial= /[§!@#$%^&*(),.?":{}|<>]/;
    let verifMail   = /^[-+.\w]{1,64}@[-.\w]{1,64}\.[-.\w]{2,6}$/i;

    let firstNameF = document.getElementById("firstName").value;
    let lastNameF  = document.getElementById("lastName").value;
    let addressF   =   document.getElementById("address").value;
    let cityF      =    document.getElementById("city").value;
    let emailF     =    document.getElementById("email").value;
    let veriForm  = true;

    if(verifNumber.test(firstNameF)  || verifSpecial.test(firstNameF) ) {
        document.getElementById("firstNameErrorMsg").innerText = "Veuillez renseigner un prénom valide";
        veriForm = false;
    }
    if(verifNumber.test(lastNameF)  || verifSpecial.test(lastNameF) ) {
        document.getElementById("lastNameErrorMsg").innerText = "Veuillez renseigner un nom valide";
        veriForm = false;
    };
    if(verifSpecial.test(addressF)) {
        document.getElementById("addressErrorMsg").innerText = "Veuillez renseigner une adresse valide";
        veriForm = false;
    };
    if(verifNumber.test(cityF)  || verifSpecial.test(cityF)) {
        document.getElementById("cityErrorMsg").innerText = "Veuillez renseigner une ville valide";
        veriForm = false;
    };
    if(verifMail.test(emailF) == false ) {
        document.getElementById("emailErrorMsg").innerText = "Veuillez renseigner un email valide";
        veriForm = false;
    };
    if(veriForm == true) {//creation objet contact
        contact = {
            firstName : firstNameF,
            lastName  : lastNameF,
            address   : addressF,
            city      : cityF,
            email     : emailF
        };
        return contact;
    }else {
        return false;
    }
}

//écoute du formulaire, POST API et redirection page confirmation 
document.querySelector(".cart__order__form").addEventListener("submit",async function(e){
    e.preventDefault();
    if(verifCart() && verifInput() != false  ){
        module.fetchApi(`${module.urlApi}/order`, {   
            method:'POST',
            body:JSON.stringify({contact, products}),
            headers:{'Content-Type': 'application/json', 
            'Accept':'application/json'}
        })
        .then(result => window.location.replace(`./confirmation.html?orderId=${result.orderId}`))
        .catch(err => {   // exécute si erreur
            document.querySelector('section').textContent =                         
            "Oups... Désolé un problème est survenu, merci de réessayer plus tard";
        })
    }
    else{alert("Veuillez vérifier votre panier et votre formulaire")}
});