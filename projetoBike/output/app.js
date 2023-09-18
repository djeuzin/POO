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
    //Finds a rent in the stack with same user, bike and no return date. Gets the difference of the times
    //in hours and returns the value of the rent
    returnBike(bike, user) {
        const currentTime = new Date();
        const rent = this.rents.find(aRent => aRent.bike.id === bike.id && aRent.user.email === user.email && aRent.endDate === undefined);
        if (!rent) {
            throw new Error('Rent not found');
        }
        rent.endDate = currentTime;
        rent.bike.available = true;
        var timeDiff = (rent.endDate.getTime() - rent.startDate.getTime()) / 1000;
        timeDiff /= (60 * 60);
        return rent.bike.rate * timeDiff;
    }
    //If a bike is avaliable, sets its avaliability to false, creates a new rent and pushes onto the stack
    rentBike(bike, user, date1, date2) {
        if (!bike.available) {
            throw new Error('Bike unavaliable');
        }
        bike.available = false;
        const newRent = new rent_1.Rent(bike, user, new Date());
        this.rents.push(newRent);
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
        const unhashedPassword = user.password;
        user.password = bcrypt.hashSync(unhashedPassword, 10);
        this.users.push(user);
        console.log('User added to database');
    }
    //Function that takes an email and a password and verifies if there's a user registered with the given email and password
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
    getBikePosition(aBike) {
        navigator.geolocation.getCurrentPosition(aBike.onSuccess);
        console.log(aBike.latitude, aBike.longitude);
    }
}
exports.App = App;
