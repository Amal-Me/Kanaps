import * as module from './module.js';
let urlKanaps = module.urlApi;
//appel API et affichage de tous les produits
function getAndDisplayKanaps () {
    module.getKanapsFromApi(urlKanaps) 
    .then(result => module.displayListProducts(result))     
    .catch(err => {                   // exécute si erreur
        document.querySelector('section').textContent =          
        "Oups... Désolé un problème est survenu, merci de réessayer plus tard";
        document.querySelector('section').style.fontSize = '24px';
    })
}
getAndDisplayKanaps();