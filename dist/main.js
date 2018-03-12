System.register("class/Point", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Point;
    return {
        setters: [],
        execute: function () {
            Point = class Point {
                constructor(lat = 0, lng = 0) {
                    this.lat = lat;
                    this.lng = lng;
                }
            };
            exports_1("Point", Point);
        }
    };
});
System.register("class/Vendeur", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var Vendeur;
    return {
        setters: [],
        execute: function () {
            Vendeur = class Vendeur {
                constructor(name = "", firstname = "") {
                    this.name = name;
                    this.firstname = firstname;
                }
                setName(name) {
                    this.name = name;
                }
                setFirstName(firstname) {
                    this.firstname = firstname;
                }
                getName() {
                    return this.name;
                }
                getFirstName() {
                    return this.firstname;
                }
            };
            exports_2("Vendeur", Vendeur);
        }
    };
});
System.register("class/Product", [], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var Product;
    return {
        setters: [],
        execute: function () {
            Product = class Product {
                constructor(label = "", price = "", image_url = "") {
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
            };
            exports_3("Product", Product);
        }
    };
});
System.register("class/Marker", [], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var Marker;
    return {
        setters: [],
        execute: function () {
            Marker = class Marker {
                constructor(map, position, store, description, vendeur = [], product = []) {
                    this.position = position;
                    this.store = store;
                    this.description = description;
                    this.create_marker(map, position, store);
                    this.create_infowindow(store, description);
                    this.vendeur = vendeur;
                    this.product = product;
                }
                toJSON() {
                    return {
                        position: this.position,
                        store: this.store,
                        description: this.description,
                        vendeur: this.vendeur,
                        product: this.product
                    };
                }
                getMarker() {
                    return this.marker;
                }
                getInfoWindow() {
                    return this.infowindow;
                }
                getStore() {
                    return this.store;
                }
                setVendeur(vendeur) {
                    this.vendeur.push(vendeur);
                }
                setProduct(product) {
                    this.product.push(product);
                }
                create_marker(map, position, store) {
                    this.marker = new google.maps.Marker({
                        position: position,
                        map: map,
                        title: store
                    });
                }
                create_infowindow(store, description) {
                    let contentString = "<h3>Magasin: " + store + "</h3>";
                    contentString += "<p>Description: " + description + "</p>";
                    this.infowindow = new google.maps.InfoWindow({
                        content: contentString
                    });
                    this.marker.addListener('click', () => {
                        this.infowindow.open(this.map, this.marker);
                    });
                }
            };
            exports_4("Marker", Marker);
        }
    };
});
System.register("class/App", ["class/Point", "class/Marker", "class/Vendeur", "class/Product"], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var Point_1, Marker_1, Vendeur_1, Product_1, STORAGE_KEY, App;
    return {
        setters: [
            function (Point_1_1) {
                Point_1 = Point_1_1;
            },
            function (Marker_1_1) {
                Marker_1 = Marker_1_1;
            },
            function (Vendeur_1_1) {
                Vendeur_1 = Vendeur_1_1;
            },
            function (Product_1_1) {
                Product_1 = Product_1_1;
            }
        ],
        execute: function () {
            STORAGE_KEY = "marker";
            App = class App {
                constructor() {
                    this.form_mags = document.getElementById('form-mags');
                    this.store = document.getElementById('store');
                    this.description = document.getElementById("description");
                    this.latitude = document.getElementById("latitude");
                    this.longitude = document.getElementById("longitude");
                    this.form_vend = document.getElementById("form-vend");
                    this.form_prod = document.getElementById("form-prod");
                    this.label = document.getElementById("label");
                    this.price = document.getElementById("price");
                    this.image = document.getElementById("image");
                    this.remove = document.getElementById("remove");
                    this.markers = [];
                    this.position = new Point_1.Point(0, 0);
                    this.zoom = 4;
                }
                getMarker() {
                    return this.marker;
                }
                getRemove() {
                    return this.remove;
                }
                getStore() {
                    return this.store;
                }
                getDescription() {
                    return this.description;
                }
                getLatitude() {
                    return this.latitude;
                }
                setLatitude(lat) {
                    this.latitude = lat;
                }
                getLongitude() {
                    return this.longitude;
                }
                setLongitude(lng) {
                    this.longitude = lng;
                }
                getMap() {
                    return this.map;
                }
                getFormMags() {
                    return this.form_mags;
                }
                getFormProd() {
                    return this.form_prod;
                }
                getTabMarkers() {
                    return this.markers;
                }
                getFormVend() {
                    let form_vend = document.getElementById("form-vend");
                    return form_vend;
                }
                initMap() {
                    this.map = new google.maps.Map(document.getElementById('map'), {
                        center: { lat: this.position.lat, lng: this.position.lng },
                        zoom: this.zoom
                    });
                }
                addVendeur() {
                    let magasin = document.getElementById("liste");
                    let name = document.getElementById("name_vendeur");
                    let firstname = document.getElementById("firstname_vendeur");
                    let mag = magasin.value;
                    let name_vendeur = name.value;
                    let firstname_vendeur = firstname.value;
                    let vendeur = new Vendeur_1.Vendeur(name_vendeur, firstname_vendeur);
                    this.updateVendeurMarker(mag, vendeur);
                }
                addProduct(result) {
                    console.log(this.label.value);
                    let product = new Product_1.Product(this.label.value, this.price.value, this.image.value);
                    for (let res of result) {
                        this.updateProductMarker(res, product);
                    }
                }
                updateProductMarker(mag, product) {
                    for (let marker of this.markers) {
                        if (marker.getStore() == mag) {
                            marker.setProduct(product);
                            let content = marker.getInfoWindow().getContent();
                            content += "<p>" + product.getLabel() + " " + product.getPrice() + "</p>";
                            marker.getInfoWindow().setContent(content);
                        }
                    }
                }
                addMarker() {
                    this.position = new Point_1.Point(parseFloat(this.getLatitude().value), parseFloat(this.getLongitude().value));
                    this.marker = new Marker_1.Marker(this.getMap(), this.position, this.getStore().value, this.getDescription().value, [], []);
                    this.markers.push(this.marker);
                }
                updateVendeurMarker(mag, vendeur) {
                    for (let marker of this.markers) {
                        if (marker.getStore() == mag) {
                            marker.setVendeur(vendeur);
                            let content = marker.getInfoWindow().getContent();
                            content += "<p>" + vendeur.name + " " + vendeur.firstname + "</p>";
                            marker.getInfoWindow().setContent(content);
                        }
                    }
                }
                resetForm() {
                    this.getStore().value = "";
                    this.getDescription().value = "";
                    this.getLatitude().value = "";
                    this.getLongitude().value = "";
                }
                registerStorage() {
                    let str = JSON.stringify(this.markers);
                    localStorage.setItem(STORAGE_KEY, str);
                }
                showStores() {
                    let localS = localStorage.getItem(STORAGE_KEY);
                    let array = JSON.parse(localS);
                    if (array != null) {
                        for (let mark of array) {
                            const marker = new Marker_1.Marker(this.map, new Point_1.Point(mark.position.lat, mark.position.lng), mark.store, mark.description, mark.vendeur, mark.product);
                            for (let product of mark.product) {
                                let content = marker.getInfoWindow().getContent();
                                content += "<p>" + product.label + " " + product.price + "</p>";
                                marker.getInfoWindow().setContent(content);
                            }
                            for (let vendor of mark.vendeur) {
                                let content = marker.getInfoWindow().getContent();
                                content += "<p>" + vendor.name + " " + vendor.firstname + "</p>";
                                marker.getInfoWindow().setContent(content);
                            }
                            this.markers.push(marker);
                        }
                    }
                }
                createVendeurForm() {
                    let mag_vendeur = document.createElement('label');
                    mag_vendeur.id = "shop_vendeur";
                    this.form_vend.appendChild(mag_vendeur);
                    let span_mag = document.createElement('span');
                    span_mag.innerText = "Magasin";
                    mag_vendeur.appendChild(span_mag);
                    let list = document.createElement('select');
                    list.name = "liste";
                    list.id = "liste";
                    mag_vendeur.appendChild(list);
                    let localS = localStorage.getItem(STORAGE_KEY);
                    let array = JSON.parse(localS);
                    if (array != null) {
                        for (let mark of array) {
                            let mag = document.createElement("option");
                            mag.innerText = mark.store;
                            list.appendChild(mag);
                        }
                    }
                    let vendeur_submit = document.createElement('input');
                    vendeur_submit.id = "add_vendeur";
                    vendeur_submit.name = "add_vendeur";
                    vendeur_submit.type = "submit";
                    vendeur_submit.innerText = "Ajouter vendeur";
                    this.form_vend.appendChild(vendeur_submit);
                }
                createProductForm() {
                    let mag_vendeur = document.createElement('label');
                    mag_vendeur.id = "shop_product";
                    this.form_prod.appendChild(mag_vendeur);
                    let span_mag = document.createElement('span');
                    span_mag.innerText = "Magasin";
                    mag_vendeur.appendChild(span_mag);
                    let list = document.createElement('select');
                    list.multiple = true;
                    list.name = "liste_prod";
                    list.id = "liste_prod";
                    mag_vendeur.appendChild(list);
                    let localS = localStorage.getItem(STORAGE_KEY);
                    let array = JSON.parse(localS);
                    if (array != null) {
                        for (let mark of array) {
                            let mag = document.createElement("option");
                            mag.innerText = mark.store;
                            list.appendChild(mag);
                        }
                    }
                    let product_submit = document.createElement('input');
                    product_submit.id = "add_product";
                    product_submit.name = "add_product";
                    product_submit.type = "submit";
                    product_submit.innerText = "Ajouter produit";
                    this.form_prod.appendChild(product_submit);
                }
                removeFormListVendeur() {
                    let shop = document.getElementById('shop_vendeur');
                    let input = document.getElementById('add_vendeur');
                    shop.remove();
                    input.remove();
                }
                removeFormListProduct() {
                    let shop = document.getElementById('shop_product');
                    let input = document.getElementById('add_product');
                    shop.remove();
                    input.remove();
                }
                removeAll() {
                    for (let marker of this.markers) {
                        marker.getMarker().setMap(null);
                    }
                    this.markers = [];
                    localStorage.removeItem(STORAGE_KEY);
                    this.removeFormListVendeur();
                    this.removeFormListProduct();
                    this.createVendeurForm();
                    this.createProductForm();
                }
            };
            exports_5("App", App);
        }
    };
});
System.register("main", ["class/App"], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var App_1, app;
    return {
        setters: [
            function (App_1_1) {
                App_1 = App_1_1;
            }
        ],
        execute: function () {
            app = new App_1.App();
            app.createVendeurForm();
            app.createProductForm();
            app.initMap();
            app.showStores();
            app.getFormMags().onsubmit = function (event) {
                event.preventDefault();
                app.addMarker();
                app.registerStorage();
                app.resetForm();
                app.removeFormListVendeur();
                app.removeFormListProduct();
                app.createVendeurForm();
                app.createProductForm();
            };
            app.getFormProd().onsubmit = function (event) {
                event.preventDefault();
                let liste = document.getElementById("liste_prod");
                let result = [];
                for (let i = 0, len = liste.length; i < len; i++) {
                    let opt = liste[i];
                    if (opt.selected) {
                        result.push(opt.value);
                    }
                }
                app.addProduct(result);
                app.registerStorage();
                app.resetForm();
                app.removeFormListProduct();
                app.createProductForm();
            };
            app.getFormVend().onsubmit = function (event) {
                event.preventDefault();
                app.addVendeur();
                app.registerStorage();
            };
            app.getRemove().onsubmit = function (event) {
                event.preventDefault();
                app.removeAll();
                app.resetForm();
            };
            app.getMap().addListener('click', function (event) {
                app.getLatitude().value = event.latLng.lat();
                app.getLongitude().value = event.latLng.lng();
            });
        }
    };
});
//# sourceMappingURL=main.js.map