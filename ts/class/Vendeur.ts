export class Vendeur {

    public name: string;
    public firstname: string;

    constructor(name = "", firstname = "" ) {

        this.name = name;
        this.firstname = firstname;

    }

    setName(name:string) {
        this.name = name;
    }

    setFirstName (firstname: string) {
        this.firstname = firstname;
    }


    getName() {
        return this.name;
    }

    getFirstName() {

        return this.firstname;

    }
}