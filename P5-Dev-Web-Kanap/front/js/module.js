export const urlApi = `http://localhost:3000/api/products`;
// recuperation produits API
export function fetchApi(a,b) { 
    return new Promise((fonction) => { // retourne une promesse a la fonction 
        fetch (a,b).then(res => { // appel API 
            if (res.ok) { return res.json()}  // si obtenu, reour au format JSON 
        })
        .then(result => fonction(result))// renvoi le resultat dans cette fonction en argument
    })
}