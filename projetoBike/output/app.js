"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const rent_1 = require("./rent");
const crypto_1 = __importDefault(require("crypto"));
const bcrypt = require('bcryptjs');
class App {
    constructor() {
        this.users = [];
        this.bikes = [];
        this.rents = [];
    }
    //Prints and then returns the users array
    userList() {
        console.log(this.users);
        return this.users;
    }
    //Prints and then returns the list of rents
    rentList() {
        console.log(this.rents);
        return this.rents;
    }
    //Prints and then returns the list of bikes registered
    bikeList() {
        console.log(this.bikes);
        return this.bikes;
    }
    //Finds a rent with the same user and bike in the database with no date of return. If it finds, adds
    //today's date as the date of return, if not throws an error as the rent wasn't found in the database
    returnBike(bike, user) {
        const rent = this.rents.find(aRent => aRent.bike === bike && aRent.user.email === user.email && aRent.dateReturned === undefined);
        if (rent) {
            rent.dateReturned = new Date();
            console.log('Bike returne successfully');
        }
        throw new Error('Rent not found');
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
    //Adding password cryptography 
    addUser(user) {
        if (this.users.some(rUser => { return rUser.email === user.email; })) {
            throw new Error('Email already in use.');
        }
        user.id = crypto_1.default.randomUUID();
        //Hashing the password
        const oldPassword = user.password;
        user.password = bcrypt.hashSync(oldPassword, 10);
        this.users.push(user);
        console.log('User added to database');
    }
    //Function that takes an email and a password and verifies if there's a user registered with that email and password
    verifyUser(email, password) {
        const user = this.users.find(aUser => aUser.email === email);
        //If no user with the same email was found or the given password's hash doesn't match return false
        if (!user || !bcrypt.compareSync(password, user.password)) {
            console.log('Email or password incorret');
            return false;
        }
        else {
            console.log('User verified');
            return true;
        }
    }
}
exports.App = App;
