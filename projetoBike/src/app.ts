import { Bike } from "./bike"
import { Rent } from "./rent"
import { User } from "./user"
import crypto from 'crypto'
const bcrypt = require('bcryptjs')

export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []

    //Prints and then returns the users array
    userList(): User[] {
        console.log(this.users)
        return this.users
    }

    //Prints and then returns the list of rents
    rentList(): Rent[]{
        console.log(this.rents)
        return this.rents
    }

    //Prints and then returns the list of bikes registered
    bikeList(): Bike[] {
        console.log(this.bikes)
        return this.bikes
    }

    //Finds a rent in the stack with same user, bike and no return date. Gets the difference of the times
    //in hours and returns the value of the rent
    returnBike(bike: Bike, user: User): number {
        const currentTime = new Date()
        const rent = this.rents.find(aRent => aRent.bike.id === bike.id && aRent.user.email === user.email && aRent.endDate === undefined)

        if(!rent){
            throw new Error('Rent not found')
        }

        rent.endDate = currentTime
        rent.bike.available = true
        var timeDiff = (rent.endDate.getTime() - rent.startDate.getTime()) / 1000
        timeDiff /= (60*60)
        return rent.bike.rate * timeDiff
    }

    //If a bike is avaliable, sets its avaliability to false, creates a new rent and pushes onto the stack
    rentBike(bike: Bike, user: User, date1: Date, date2: Date): void {
        if(!bike.available) {
            throw new Error('Bike unavaliable')
        }

        bike.available = false
        const newRent = new Rent(bike, user, new Date())
        this.rents.push(newRent)
    }

    //Receives and email, if there's an user with that email on the users array, remove it
    //Returns true if it successfully deleted the user, falser otherwise
    removeUser(email: string): boolean {
        const index = this.users.findIndex(user => user.email === email)

        if(index){
            this.users.splice(index, 1)
            console.log('User removed')
            return true
        }

        console.log('Unable to find user')
        return false
    }

    //Receives a Bike object, adds an ID to it and pushes onto the bikes array
    registerBike(newBike: Bike): void {
        newBike.id = crypto.randomUUID()
        this.bikes.push(newBike)
        console.log('Bike registered')
    }

    findUser(email: string): User | undefined{
        return this.users.find(user => user.email === email)
    }

    //Adding password cryptography 
    addUser(user: User): void {
        if (this.users.some(rUser => { return rUser.email === user.email })){
            throw new Error('Email already in use.')
        }
        user.id = crypto.randomUUID()

        //Hashing the password
        const unhashedPassword = user.password
        user.password = bcrypt.hashSync(unhashedPassword, 10)

        this.users.push(user)

        console.log('User added to database')
    }

    //Function that takes an email and a password and verifies if there's a user registered with the given email and password
    verifyUser(email: String, password: String): boolean {
        const user = this.users.find(aUser => aUser.email === email)

        //If no user with the same email was found or the given password's hash doesn't match return false
        if(!user || !bcrypt.compareSync(password, user.password)) {
            console.log('Email or password incorret')
            return false
        }
        else {
            console.log('User verified')
            return true
        }
    }

    getBikePosition(aBike: Bike):void {
        if(!navigator.geolocation) {
            console.log('Aparelho não suporta geolocalização')
        }
        else{
            navigator.geolocation.getCurrentPosition(aBike.onSuccess)
            console.log(aBike.latitude, aBike.longitude)
        }
    }
}