import { Bike } from "./bike"
import { Rent } from "./rent"
import { User } from "./user"
import { Location } from "./location"
import crypto from 'crypto'
import { UserNotFoundError } from "./errors/user-not-found-error"
import { DuplicatedEmailError } from "./errors/duplicated-email-error"
import { RentNotFoundError } from "./errors/rent-not-found-error"
import { BikeNotFoundError } from "./errors/bike-not-found-error"
import { UserRepo } from "./ports/user-repo"
import { BikeRepo } from "./ports/bike-repo"
import { RentRepo } from "./ports/rent-repo"
import { UserWithOpenRent } from "./errors/user-with-open-rent-error"
const bcrypt = require('bcryptjs')

export class App {
    constructor (
        readonly userRepo: UserRepo,
        readonly bikeRepo: BikeRepo,
        readonly rentRepo: RentRepo
    ) {}

    //Returns the users array
    async userList(): Promise<User[]> {
        return await this.userRepo.list()
    }

    //Returns the list of bikes registered
    async bikeList(): Promise<Bike[]> {
        return await this.bikeRepo.list()
    }

    //Searches for a bike with the same id given, throws error if it doesn't find the bike
    async findBike(bikeId: string): Promise<Bike> {
        const bike = await this.bikeRepo.find(bikeId)

        if(!bike){
            throw new BikeNotFoundError()
        }

        return bike
    }

    //Finds a rent in the stack with same user, bike and no return date. Gets the difference of the times
    //in hours and returns the value of the rent
    async returnBike(bike: Bike, user: User): Promise<number> {
        const rent = await this.rentRepo.findOpen(bike.id, user.email)

        if(!rent){
            throw new RentNotFoundError
        }

        rent.endDate = new Date()
        rent.bike.available = true
        const hour = 1000 * 60 * 60
        var timeDiff = (rent.endDate.getTime() - rent.startDate.getTime()) / hour
        timeDiff = Math.abs(timeDiff)
        return rent.bike.rate * timeDiff
    }

    //If a bike is avaliable, sets its avaliability to false, creates a new rent and pushes onto the stack
    async rentBike(bikeId: string | undefined, email: string): Promise<void> {
        const user = await this.userRepo.find(email)
        const bike = await this.bikeRepo.find(bikeId)

        if(!bike.available) {
            throw new RentNotFoundError
        }

        bike.available = false
        const newRent = new Rent(bike, user, new Date())
        await this.rentRepo.add(newRent)
    }

    //Receives an email, if there's an user with that email in the users array, remove it
    //Returns true if it successfully deleted the user, falser otherwise
    async removeUser(email: string): Promise<void> {
        const user = await this.userRepo.find(email)
        const rentOpen = await this.rentRepo.findOpenRent(email)

        if(rentOpen) {
            throw new UserWithOpenRent
        }

        if(user){
            this.userRepo.remove(email)
            console.log('User removed')
            return
        }

        throw new UserNotFoundError()
    }

    //Receives a Bike object, adds an ID to it and pushes onto the bikes array
    async registerBike(newBike: Bike): Promise<string> {
        return await this.bikeRepo.add(newBike)
    }

    //Searches for a user with the same email, throws an error if it doesn't find the user
    async findUser(email: string): Promise<User> {
        const user = await this.userRepo.find(email)
        if(!user) {
            throw new UserNotFoundError
        }
        return user
    }

    //Adding password cryptography 
    async addUser(user: User): Promise<string> {
        if (await this.userRepo.find(user.email)){
            throw new DuplicatedEmailError()
        }

        user.id = crypto.randomUUID()

        //Hashing the password
        const unhashedPassword = user.password
        user.password = await bcrypt.hashSync(unhashedPassword, 10)

        await this.userRepo.add(user)
        return user.id
    }

    //Function that takes an email and a password and verifies if there's a user registered with the given email and password
    async verifyUser(email: string, password: string): Promise<boolean> {
        const user = await this.userRepo.find(email)

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
    async moveBike(bikeId: string, newPosition: Location): Promise<void> {
        const aBike = await this.findBike(bikeId)

        aBike.position = newPosition
        console.log('Bike moved to new location.')
    }
}