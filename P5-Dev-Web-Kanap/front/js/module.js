export const urlApi = `http://localhost:3000/api/products`;

export async function fetchApi(a,b) { //fonction asynchrone qui attend le fetch dont elle prend les mêmes paramètres
      try {
        const res = await fetch(a, b);// requête API
        if (res.ok) { return res.json()} // si obtenu, retour au format JSON 
    } catch (err) {return console.log("HTTP-Error: " + err.status);}
}