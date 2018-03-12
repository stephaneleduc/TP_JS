import { App } from "./class/App";

//On créé une instance de la classe App
const app: App = new App();

//On affiche le formulaire des vendeurs
app.createVendeurForm();

//On affiche le formulaire des produits
app.createProductForm();

//On initialise la carte google maps
app.initMap();

//On recupere les magasins du localStorage
app.showStores();

//On agit lors du clic sur le bouton "créer"
//Cela ajoute un nouveau marqueur sur la carte
app.getFormMags().onsubmit = function ( event ) {

    //On annule par défaut le rechargement de la page lors de la validation
    event.preventDefault();
    //On ajoute un nouveau marqueur
    app.addMarker();
    //On enregistre dans le localStorage
    app.registerStorage();
    //On reset le formulaire
    app.resetForm();
    //On supprime les formulaires vendeur et produit
    app.removeFormListVendeur();
    app.removeFormListProduct();
    //On recrée les formulaires avec le nouveau magasin
    app.createVendeurForm();
    app.createProductForm();

}

app.getFormProd().onsubmit = function ( event) {

    event.preventDefault();

    //Recuperation des elements selectionnés de la liste
    let liste : HTMLSelectElement = document.getElementById("liste_prod") as HTMLSelectElement;
    let result: any[] = [];
    for (let i = 0, len = liste.length; i<len; i++ ) {
        let opt = liste[i];

        if(opt.selected) {
            result.push(opt.value);
        }
    }

    //On ajoute le produit
    app.addProduct(result);

    //On enregistre dans le localStorage
    app.registerStorage();

    //On reset le formulaire
    app.resetForm();

    //On supprime le formulaire
    app.removeFormListProduct();

    //On recrée le formulaire avec le nouveau magasin
    app.createProductForm();


}

app.getFormVend().onsubmit = function ( event ) {
 
    //Empeche le rechargement de la page
    event.preventDefault();
    
    //Ajout du vendeur
    app.addVendeur();

    //enregistrement localStorage
    app.registerStorage();

}


app.getRemove().onsubmit = function (event) {
    
    event.preventDefault();

    //On supprime les marqueurs et le localStorage
    app.removeAll();

    //On reset le formulaire
    app.resetForm();
}

//Auto completion du formulaire (lat et lng)
app.getMap().addListener ('click', function( event ) {

    //Récupère la latitude
    app.getLatitude().value = event.latLng.lat();
    //Récupère la longitude
    app.getLongitude().value = event.latLng.lng();

});
