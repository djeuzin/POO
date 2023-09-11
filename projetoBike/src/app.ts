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

    //Finds a rent with the same user and bike in the database with no date of return. If it finds, adds
    //today's date as the date of return, if not throws an error as the rent wasn't found in the database
    returnBike(bike: Bike, user: User): void {
        const rent = this.rents.find(aRent => aRent.bike === bike && aRent.user.email === user.email && aRent.dateReturned === undefined)

        if(rent) {
            rent.dateReturned = new Date()
            console.log('Bike returne successfully')
        }

        throw new Error('Rent not found')
    }

    //Gets an array from this.rents of all the rents related to the bike wanted,
    //uses this new array to see if it is possible to rent, if it is, creates a rent and pushes onto this.rents
    rentBike(bike: Bike, user: User, date1: Date, date2: Date): void {
        const rentsOfBike = this.rents.filter(uRent => uRent.bike === bike)

        const newRent = Rent.create(rentsOfBike, bike, user, date1, date2)

        if(newRent){
            this.rents.push(newRent)
            console.log('Bike rented successfully')
        }
        else{
            console.log('Unable to rent bike now')
        }
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
}