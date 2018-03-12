export class Product {

    public label: string;
    public price: number;
    private image_url: string;

    constructor(label = "", price = "", image_url= "") {

        this.label = label;
        this.price = parseFloat(price);
        this.image_url = image_url;

    }

    getLabel() {
        return this.label;

    }

    getPrice() {
        return this.price;
    }
}