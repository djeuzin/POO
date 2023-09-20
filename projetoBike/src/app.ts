import { Bike } from "./bike"
import { Rent } from "./rent"
import { User } from "./user"
import { Location } from "./location"
import crypto from 'crypto'
import { UserNotFoundError } from "./errors/user-not-found-error"
import { DuplicatedEmailError } from "./errors/duplicated-email-error"
import { RentNotFoundError } from "./errors/rent-not-found-error"
import { BikeNotFoundError } from "./errors/bike-not-found-error"
const bcrypt = require('bcryptjs')

export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []

    //Returns the users array
    userList(): User[] {
        return this.users
    }

    //Returns the list of rents
    rentList(): Rent[]{
        return this.rents
    }

    //Returns the list of bikes registered
    bikeList(): Bike[] {
        return this.bikes
    }

    //Searches for a bike with the same id given, throws error if it doesn't find the bike
    findBike(bikeId: string | undefined): Bike {
        const bike = this.bikes.find(aBike => aBike.id === bikeId)

        if(!bike){
            throw new BikeNotFoundError()
        }

        return bike
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
    rentBike(bikeId: string | undefined, email: string): void {
        const user = this.findUser(email)
        const bike = this.findBike(bikeId)

        if(!bike.available) {
            throw new Error('Bike unavaliable')
        }

        bike.available = false
        const newRent = new Rent(bike, user, new Date())
        this.rents.push(newRent)
    }

    //Receives an email, if there's an user with that email in the users array, remove it
    //Returns true if it successfully deleted the user, falser otherwise
    removeUser(email: string): boolean {
        const index = this.users.findIndex(user => user.email === email)

        if(index){
            this.users.splice(index, 1)
            console.log('User removed')
            return true
        }

        throw new UserNotFoundError()
    }

    //Receives a Bike object, adds an ID to it and pushes onto the bikes array
    registerBike(newBike: Bike): string {
        newBike.id = crypto.randomUUID()
        this.bikes.push(newBike)
        console.log('Bike registered')
        return newBike.id
    }

    //Searches for a user with the same email, throws an error if it doesn't find the user
    findUser(email: string): User{
        const user = this.users.find(aUser => aUser.email === email)

        if(!user) {
            throw new UserNotFoundError()
        }

        return user
    }

    //Adding password cryptography 
    async addUser(user: User): Promise<string> {
        if (this.users.some(rUser => { return rUser.email === user.email })){
            throw new DuplicatedEmailError()
        }

        user.id = crypto.randomUUID()

        //Hashing the password
        const unhashedPassword = user.password
        user.password = await bcrypt.hashSync(unhashedPassword, 10)

        this.users.push(user)
        return user.id
    }

    //Function that takes an email and a password and verifies if there's a user registered with the given email and password
    async verifyUser(email: string, password: string): Promise<boolean> {
        const user = this.findUser(email)

        //If no user with the same email was found or the given password's hash doesn't match return false
        if(!await bcrypt.compareSync(password, user.password)) {
            console.log('Email or password incorret')
            return false
        }
        else {
            console.log('User verified')
            return true
        }
    }

    //Changes a bike location given a bike id and a location
    moveBike(bikeId: string | undefined, newPosition: Location): void {
        const aBike = this.findBike(bikeId)

        aBike.position = newPosition
        console.log('Bike moved to new location.')
    }
}