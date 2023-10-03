import { App } from "../app"
import { Bike } from "../bike"
import { User } from "../user"
import { Location } from "../location"
import { DuplicatedEmailError } from "../errors/duplicated-email-error"
import sinon from "sinon"
import { UserNotFoundError } from "../errors/user-not-found-error"
import { FakeUserRepo } from "./doubles/fake-user-repo"
import { FakeBikeRepo } from "./doubles/fake-bike-repo"
import { FakeRentRepo } from "./doubles/fake-rent-repo"
import { UserRepo} from "../../src/ports/user-repo"
import { BikeRepo } from "../../src/ports/bike-repo"
import {RentRepo}from "../ports/rent-repo"

let userRepo: UserRepo
let bikeRepo: BikeRepo
let rentRepo: RentRepo

describe('App', () => {
    beforeEach(() => {
        userRepo = new FakeUserRepo()
        bikeRepo = new FakeBikeRepo()
        rentRepo = new FakeRentRepo()
    })

    it('should be able to move a bike to a specific location', async () => {
        const app = new App(userRepo, bikeRepo, rentRepo)
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        await app.registerBike(bike)
        const newYork = new Location(40.753056, -73.983056)
        await app.moveBike(bike.id!, newYork)
        expect(bike.position.latitude).toEqual(newYork.latitude)
        expect(bike.position.longitude).toEqual(newYork.longitude)
    })

    it('should throw bike not found error when trying to move an unregistered bike', async () => {
        const app = new App(userRepo, bikeRepo, rentRepo)
        const newYork = new Location(40.753056, -73.983056)
        await expect(app.moveBike('fake-id', newYork)).rejects.toThrow('Bike not found')
    })

    //findbike
    it('should find a bike registered', async () => {
        const app = new App(userRepo, bikeRepo, rentRepo)
        const bike = new Bike('caloi mountainbike', 'mountain bike',
        1234, 1234, 100.0, 'My bike', 5, [])
        await app.registerBike(bike)

        await expect(app.findBike(bike.id!)).resolves.toEqual(bike)
    })

    //returnbike /npm install sinon @types/sinon
    it('should return the right amount of payment', async () => {
        const app = new App(userRepo, bikeRepo, rentRepo)
        const bike = new Bike('caloi mountainbike', 'mountain bike',
        1234, 1234, 100.0, 'My bike', 5, [])
        await app.registerBike(bike)
        const user = new User('Joao', 'joao@mail.com', '12345')
        await app.addUser(user)

        const clock = sinon.useFakeTimers();
        await app.rentBike(bike.id, user.email)
        const hour = 1000 * 60 * 60

        clock.tick(3 * hour)
        const rentAmount = await app.returnBike(bike, user)
        expect(rentAmount).toEqual(300.0)
    })

    //rentbike
    it('should successfully rent a bike', async () => {
        const app = new App(userRepo, bikeRepo, rentRepo)
        const bike = new Bike('caloi mountainbike', 'mountain bike',
        1234, 1234, 100.0, 'My bike', 5, [])
        await app.registerBike(bike)
        const user = new User('Joao', 'joao@mail.com', '12345')
        await app.addUser(user)
        await app.rentBike(bike.id, user.email)

        const appRentRepo = (app.rentRepo as FakeRentRepo)
        expect(appRentRepo.rents.length).toEqual(1)
        expect(appRentRepo.rents[0].bike).toEqual(bike)
        expect(appRentRepo.rents[0].user).toEqual(user)
    })

    //removeuser
    it('should handle user removal', async () => {
        const app = new App(userRepo, bikeRepo, rentRepo)
        const user = new User('Joao', 'joao@mail.com', '12345')
        await app.addUser(user)

        await app.removeUser(user.email)
        expect((app.userRepo as FakeUserRepo).users.length).toEqual(0)
    })

    it('should not remove a user not found', async () => {
        const app = new App(userRepo, bikeRepo, rentRepo)
        await expect(app.removeUser('fake@email.com')).rejects.toThrow(UserNotFoundError)
    })

    //registerbike
    it('should successfully add a bike to the bikes array with a id', async () => {
        const app = new App(userRepo, bikeRepo, rentRepo)
        const bike = new Bike('caloi mountainbike', 'mountain bike',
        1234, 1234, 100.0, 'My bike', 5, [])
        const newBikeId = await app.registerBike(bike)

        const appBikeRepo = app.bikeRepo as FakeBikeRepo
        expect(appBikeRepo.bikes.length).toEqual(1)
        expect(appBikeRepo.bikes[0].id).toEqual(newBikeId)
    })

    //finduser
    it('should find a user registered', async () => {
        const app = new App(userRepo, bikeRepo, rentRepo)
        const user = new User('Joao', 'joao@mail.com', '12345')
        const newId = await app.addUser(user)

        const search = await app.findUser(user.email)

        expect(search).toEqual(user)
    })

    it('should throw user not found error', async () => {
        const app = new App(userRepo, bikeRepo, rentRepo)
        await expect(app.findUser('fake@email.com')).rejects.toThrow(UserNotFoundError)
    })

    //addusers
    it('should add a user to the users array', async () => {
        const app = new App(userRepo, bikeRepo, rentRepo)
        const user = new User('Joao', 'joao@mail.com', '12345')
        const newId = await app.addUser(user)

        const appUserRepo = app.userRepo as FakeUserRepo
        expect(appUserRepo.users.length).toEqual(1)
        expect(appUserRepo.users[0].email).toEqual(user.email)
        expect(appUserRepo.users[0].id).toEqual(newId)
    })

    it('should not register a user with an email already in use', async () => {
        const app = new App(userRepo, bikeRepo, rentRepo)
        const user = new User('Joao', 'joao@mail.com', '12345')
        await app.addUser(user)
        const user2 = new User('Jose', 'joao@mail.com', '234325')
        
        await expect(app.addUser(user2)).rejects.toThrow(DuplicatedEmailError)
    })

    //verifyuser
    it('should verify a user successfully', async () => {
        const app = new App(userRepo, bikeRepo, rentRepo)
        const user = new User('Joao', 'joao@mail.com', '12345')
        const newId = await app.addUser(user)

        const verified = await app.verifyUser('joao@mail.com', '12345')
        
        expect(verified).toBeTruthy
    })

    it('should not verify a user with wrong password', async () => {
        const app = new App(userRepo, bikeRepo, rentRepo)
        const user = new User('Joao', 'joao@mail.com', '12345')
        const newId = await app.addUser(user)

        const verified = await app.verifyUser('joao@mail.com', 'senhaerrada')
        expect(verified).toBeFalsy
    })
})