import * as module from './module.js';
let cart = JSON.parse(localStorage.getItem("cart"));// recuperation du panier
let products = [];
let contact = {};

//création d'éléments du DOM(à améliorer en ajoutant attributs)
function createEl(el){
    return document.createElement(el);
}
//creation des articles et placement
function display() {
    cart.forEach(product => {
        let article     = createEl("article");
        let div1        = createEl("div");
        let img         = createEl("img");
        let div2        = createEl("div");
        let div2_1      = createEl("div");
        let h2          = createEl("h2");
        let p2_1        = createEl("p");
        let div2_2      = createEl("div"); 
        let div2_2_1    = createEl("div");
        let p2_2_1      = createEl("p");
        let input2_2_1  = createEl("input");
        let div2_2_2    = createEl("div");
        let p2_2_2      = createEl("p");
        let p2_2_0      = createEl("p");

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

    let urlKanaps = `${module.urlApi}/${product.productId}`;
    module.getKanapsFromApi(urlKanaps)
    .then(result => {
            img.src = result.imageUrl;
            img.alt = result.altTxt;
            h2.textContent     = result.name;
            p2_1.textContent   = result.price + ',00 €';
            // p2_1.setAttribute  ("data-price", result.price);            
    })
    .catch(err => {
        document.querySelector('section').textContent = 
        "Oups... Désolé un problème est survenu, merci de réessayer plus tard";
        document.querySelector('section').style.fontSize = '24px';
    })
}) 
}
display();

module.deleteArticle(cart);//suppression article
module.quantityChange(cart);//changement quantité
module.quantityTotal();//calcul quantité total
module.priceTotal(cart);//calcul prix total

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

//écoute du formulaire, POST API et redirection page confirmation (améliorer fonction)
document.querySelector(".cart__order__form").addEventListener("submit",async function(e){
    e.preventDefault();
    if(verifCart() && verifInput() != false  ){
        let result  = await fetch(`${module.urlApi}/order`, {   
            method:'POST',
            body:JSON.stringify({contact, products}),
            headers:{'Content-Type': 'application/json', 
            'Accept':'application/json'}
        })
        let data = await result.json()
        window.location.replace(`./confirmation.html?orderId=${data.orderId}`)
        // result.catch(error => {console.log(error)});
    }
    else{alert("error")}
});





