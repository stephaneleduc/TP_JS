import { Point } from "./Point";
import { Vendeur } from "./Vendeur";

//La classe Marker est dédié au marqueur qui seront placés sur la carte
//Permet de créer le marqueur et l'info bulle correspondante 
export class Marker {

    private position: Point;
    private map :google.maps.Map;
    private store: string;
    private description: string;
    private marker: google.maps.Marker;
    private infowindow: google.maps.InfoWindow;


    private vendeur: Vendeur[];

    //Le constructeur réalise toutes les opérations
    constructor(map: google.maps.Map, position: Point, store: string, description: string, vendeur: Vendeur[]) {

        this.position = position;
        this.store = store;
        this.description = description;
        //Création du marqueur
        this.create_marker (map, position, store );

        //Création de l'infobulle du marqueur
        this.create_infowindow (store, description );

        //Création du vendeur
        this.vendeur = vendeur;

    }

    //Methode magique qui fonctionne avec stringify
    //Permet d'enregistrer uniquement ce qu'il y a en-dessous
    //Cette methode est appelé par stringify
    toJSON() {

        return {

            position: this.position,
            store: this.store,
            description: this.description,
            vendeur: this.vendeur
        }
    }

    getMarker() : google.maps.Marker {
        return this.marker;
    }

    getInfoWindow() : google.maps.InfoWindow {
        return this.infowindow;
    }

    getStore() : String {
        return this.store;
    }

    setVendeur(vendeur:Vendeur) {
        this.vendeur.push(vendeur);
    }

    //On définit les paramètres du nouveau marqueur
    create_marker(map: google.maps.Map, position: Point, store: string) {

        this.marker = new google.maps.Marker({
            position: position,
            map: map,
            title: store

        });

    }

    //On définit les paramètres de l'info bulle
    create_infowindow (store: string, description: string) {

        let contentString ="<h3>Magasin: " + store + "</h3>";
            contentString += "<p>Description: " + description + "</p>";

        this.infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        //On affiche l'info bulle lors du clic sur le marqueur
        this.marker.addListener ('click',() => {

            this.infowindow.open (this.map, this.marker);
        });

    }

}