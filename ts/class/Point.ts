//La classe Point va servir pour la position sur la carte
//Un point contient 2 attributs: longitude et latitude
export class Point {

    public lat: number;
    public lng: number;

    //Par défaut, le point est créé aux coordonnées 0, 0
    constructor (lat:number = 0, lng: number = 0) {

        this.lat = lat;
        this.lng = lng;
    }
}