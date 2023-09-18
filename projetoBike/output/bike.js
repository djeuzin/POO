"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bike = void 0;
class Bike {
    constructor(name, type, bodysize, maxLoad, rate, description, ratings, imageUrls, id) {
        this.name = name;
        this.type = type;
        this.bodysize = bodysize;
        this.maxLoad = maxLoad;
        this.rate = rate;
        this.description = description;
        this.ratings = ratings;
        this.imageUrls = imageUrls;
        this.id = id;
        this.available = true;
        this.latitude = undefined;
        this.longitude = undefined;
    }
    onSuccess(position) {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        console.log('Localização adquirida com sucesso');
    }
}
exports.Bike = Bike;
