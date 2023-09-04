import { Bike } from "./bike"
import { Rent } from "./rent"
import { User } from "./user"
import crypto from 'crypto'

export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []

    //Slices the rent with the same bike and user from this.rents, 
    //then adds the date of return to the object rent
    returnBike(bike: Bike, user: User): void {
        const indexOfRent = this.rents.findIndex(rent => rent.bike === bike && rent.user === user)
        const arrRent = this.rents.slice(indexOfRent, indexOfRent+1)
        const returnedRent = arrRent[0]

        returnedRent.dateReturned = new Date()
        console.log('Bike returned successfully')
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

    addUser(user: User): void {
        if (this.users.some(rUser => { return rUser.email === user.email })){
            throw new Error('Email already in use.')
        }
        user.id = crypto.randomUUID()
        this.users.push(user)

        console.log('User added to database')
    }
}