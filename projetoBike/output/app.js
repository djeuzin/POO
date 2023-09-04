"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const rent_1 = require("./rent");
const crypto_1 = __importDefault(require("crypto"));
class App {
    constructor() {
        this.users = [];
        this.bikes = [];
        this.rents = [];
    }
    //Slices the rent with the same bike and user from this.rents, 
    //then adds the date of return to the object rent
    returnBike(bike, user) {
        const indexOfRent = this.rents.findIndex(rent => rent.bike === bike && rent.user === user);
        const arrRent = this.rents.slice(indexOfRent, indexOfRent + 1);
        const returnedRent = arrRent[0];
        returnedRent.dateReturned = new Date();
        console.log('Bike returned successfully');
    }
    //Gets an array from this.rents of all the rents related to the bike wanted,
    //uses this new array to see if it is possible to rent, if it is, creates a rent and pushes onto this.rents
    rentBike(bike, user, date1, date2) {
        const rentsOfBike = this.rents.filter(uRent => uRent.bike === bike);
        const newRent = rent_1.Rent.create(rentsOfBike, bike, user, date1, date2);
        if (newRent) {
            this.rents.push(newRent);
            console.log('Bike rented successfully');
        }
        else {
            console.log('Unable to rent bike now');
        }
    }
    //Receives and email, if there's an user with that email on the users array, remove it
    //Returns true if it successfully deleted the user, falser otherwise
    removeUser(email) {
        const index = this.users.findIndex(user => user.email === email);
        if (index) {
            this.users.splice(index, 1);
            console.log('User removed');
            return true;
        }
        console.log('Unable to find user');
        return false;
    }
    //Receives a Bike object, adds an ID to it and pushes onto the bikes array
    registerBike(newBike) {
        newBike.id = crypto_1.default.randomUUID();
        this.bikes.push(newBike);
        console.log('Bike registered');
    }
    findUser(email) {
        return this.users.find(user => user.email === email);
    }
    addUser(user) {
        if (this.users.some(rUser => { return rUser.email === user.email; })) {
            throw new Error('Email already in use.');
        }
        user.id = crypto_1.default.randomUUID();
        this.users.push(user);
        console.log('User added to database');
    }
}
exports.App = App;
