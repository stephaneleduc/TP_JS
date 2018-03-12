import { Point } from "./Point";
import { Marker } from "./Marker";
import { Vendeur } from "./Vendeur";

//Constante de la clé du storage
const STORAGE_KEY = "marker";

export class App {

    //Declaration de la map
    private map: google.maps.Map;

    //DEclaration d'un marqueur
    private marker: Marker;
    
    //Declaration du formulaire "Magasin" et de ses inputs 
    private form_mags = document.getElementById('form-mags') as HTMLFormElement;
    private store = document.getElementById('store') as HTMLInputElement;
    private description = document.getElementById("description") as HTMLInputElement;
    private latitude = document.getElementById("latitude") as HTMLInputElement;
    private longitude = document.getElementById("longitude") as HTMLInputElement;

    private vendeur = document.getElementById("vendeur") as HTMLDivElement;

    private form_vend = document.getElementById("form-vend") as HTMLFormElement;
    private mag = document.getElementById("liste") as HTMLInputElement ;
    private name = document.getElementById("name_vendeur") as HTMLInputElement;
    private firstname = document.getElementById("firstname_vendeur") as HTMLInputElement;

    private remove = document.getElementById("remove") as HTMLFormElement;

    //Declaration des propriétés du marqueur
    private position: Point;
    private zoom: number;

    //tableau qui contiendra tous les marqueurs (à sauver dans le localStorage)
    private markers: Marker[] = [];

    //Tableau qui contiendra les vendeurs du magasin
    private vendeurs: Vendeur[] = [];

    constructor() {

        this.position = new Point( 0, 0 );
        this.zoom = 4;
        
    }

    //Getter form-vend
    getVend() :HTMLDivElement {
        return this.vendeur;
    }

    //getter marker
    getMarker() : Marker {
        return this.marker;
    }

    //getter remove
    getRemove() : HTMLFormElement {
        return this.remove;
    }


    //Getter store
    getStore(): HTMLInputElement {
        return this.store;
    }

    //Getter description
    getDescription() : HTMLInputElement {
        return this.description;
    }

    //Getter latitude
    getLatitude():HTMLInputElement {
        return this.latitude;
    }
    //Setter latitude
    setLatitude(lat:HTMLInputElement) {
        this.latitude = lat;
    }

    //Getter longitude
    getLongitude():HTMLInputElement {
        return this.longitude;
    }
    //Setter longitude
    setLongitude(lng:HTMLInputElement) {
        this.longitude = lng;
    }

    //Getter de la MAP
    getMap(): google.maps.Map {

        return this.map;
    }

    //Getter du formulaire "form-mags"
    getFormMags(): HTMLFormElement {

        return this.form_mags;
    }

    //Getter pour le tableau de markers
    getTabMarkers(): Marker[] {

        return this.markers;
    }

     //recuperation du formulaire vendeur
     getFormVend() {
        let form_vend: HTMLFormElement = document.getElementById("form-vend") as HTMLFormElement;
        return form_vend;
    }

    //Initialisation de la map
    initMap() {

        this.map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: this.position.lat, lng: this.position.lng },
            zoom: this.zoom
        });

    }

    addVendeur() {

        let magasin = document.getElementById("liste") as HTMLInputElement ;
        let name = document.getElementById("name_vendeur") as HTMLInputElement;
        let firstname = document.getElementById("firstname_vendeur") as HTMLInputElement;

        let mag = magasin.value;
        let name_vendeur = name.value;
        let firstname_vendeur = firstname.value;

        let vendeur = new Vendeur(name_vendeur, firstname_vendeur);

        //this.vendeurs.push(vendeur);

        this.updateMarker(mag, vendeur);
    }

    //Ajout du nouveau marqueur
    addMarker() {

        this.position = new Point (

            parseFloat(this.getLatitude().value),
            parseFloat(this.getLongitude().value)
        );

        this.marker = new Marker(this.getMap(), this.position, this.getStore().value, this.getDescription().value, this.vendeurs);

        //Ajoute le nouveau marqueur au tableau de marqueur
        this.markers.push(this.marker);

    }

    //On met à jour le marker avec le nouveau vendeur
    updateMarker( mag :string, vendeur: Vendeur ) {

        //On cherche le marqueur concerné
        for(let marker of this.markers) {

            if (marker.getStore() == mag) {

                //On push le nouveau vendeur dans le tableau
                marker.setVendeur(vendeur);

                //On rajoute le contenu nom et prenom du nouveau vendeur dans l'infobulle
                let content = marker.getInfoWindow().getContent();
                content += "<p>" + vendeur.name + " " + vendeur.firstname + "</p>";
                marker.getInfoWindow().setContent(content);

                
            }
            
        }

    }


    //Cette fonction supprime les données dans le formulaire lors de la validation
    resetForm() {

        this.getStore().value ="";
        this.getDescription().value = "";
        this.getLatitude().value = "";
        this.getLongitude().value ="";

    }


    //Enregistre les marqueurs dans le localStorage
    registerStorage() {

        let str = JSON.stringify ( this.markers );
        localStorage.setItem (STORAGE_KEY, str);

    }

    //Affiche les magasin qui ont été enregistrés dans le 
    //localStorage avec les marqueurs
    showStores() {

        let localS: any = localStorage.getItem( STORAGE_KEY );
        let array: any[] = JSON.parse(localS);

        if (array != null) {

            for (let mark of array) {

                const marker: Marker = new Marker(this.map, new Point(mark.position.lat, mark.position.lng), mark.store, mark.description, mark.vendeur);

                //S'il y a des vendeurs, on met à jour l'infobulle avec leurs noms et prenoms
                for (let vendor of mark.vendeur) {

                    let content = marker.getInfoWindow().getContent();
                    content += "<p>" + vendor.name + " " + vendor.firstname + "</p>";

                    marker.getInfoWindow().setContent(content);
                    
                }

                //Ajoute le marqueur au tableau de marqueur
                this.markers.push(marker);
            
            }
        }

    }

    createVendeurForm() {

        //Ajout du troisième label
         let mag_vendeur = document.createElement('label');
         mag_vendeur.id = "shop";
         this.form_vend.appendChild(mag_vendeur);

        //Ajout span du troisieme label
        let span_mag = document.createElement('span');
        span_mag.innerText = "Magasin";
        mag_vendeur.appendChild(span_mag);

        //Creation de la liste deroulante
        let list = document.createElement('select');
        list.name = "liste";
        list.id = "liste";
        mag_vendeur.appendChild(list);

        //On recupere les noms des magasins et on les ajoute à la liste déroulante
        let localS: any = localStorage.getItem( STORAGE_KEY );
        let array: any[] = JSON.parse(localS);

        if (array != null) {

            for (let mark of array) {

                let mag = document.createElement("option");
                mag.innerText = mark.store;
                list.appendChild(mag);

            }
        }

        //Ajout du bouton submit
        let vendeur_submit = document.createElement('input');
        vendeur_submit.id = "add_vendeur";
        vendeur_submit.name = "add_vendeur";
        vendeur_submit.type = "submit";
        vendeur_submit.innerText ="Ajouter vendeur";
        this.form_vend.appendChild(vendeur_submit);
    
    }

    removeFormListVendeur() {

        let shop: HTMLElement = document.getElementById('shop') as HTMLElement;
        let input: HTMLInputElement = document.getElementById('add_vendeur') as HTMLInputElement;
        shop.remove();   
        input.remove();     
    }


    //Suppression de tous les magasins
    removeAll() {

        for (let marker of this.markers) {

            marker.getMarker().setMap(null);
            
        }

        //On vide le tableau contenant les marqueurs
        this.markers = [];

        //On vide le localStorage
        localStorage.removeItem(STORAGE_KEY);

        //On supprime le formulaire
        this.removeFormListVendeur();

        //On le recrée avec les valeurs à jour
        this.createVendeurForm();

    }


}



