import { App } from "./app"
import { Bike } from "./bike"
import { User } from "./user"
import { Location } from "./location"
import { DuplicatedEmailError } from "./errors/duplicated-email-error"
import sinon from "sinon"
import { UserNotFoundError } from "./errors/user-not-found-error"

describe('App', () => {
    it('should be able to move a bike to a specific location', () => {
        const app = new App()
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        const newYork = new Location(40.753056, -73.983056)
        app.moveBike(bike.id, newYork)
        expect(bike.position.latitude).toEqual(newYork.latitude)
        expect(bike.position.longitude).toEqual(newYork.longitude)
    })

    it('should throw bike not found error when trying to move an unregistered bike', () => {
        const app = new App()
        const newYork = new Location(40.753056, -73.983056)
        expect(() => {
            app.moveBike('fake-id', newYork)
        }).toThrow('Bike not found')
    })

    //findbike
    it('should find a bike registered', () => {
        const app = new App()
        const bike = new Bike('caloi mountainbike', 'mountain bike',
        1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)

        expect(app.findBike(bike.id)).toEqual(bike)
    })

    //returnbike /npm install sinon @types/sinon
    it('should return the right amount of payment', async () => {
        const app = new App()
        const bike = new Bike('caloi mountainbike', 'mountain bike',
        1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        const user = new User('Joao', 'joao@mail.com', '12345')
        await app.addUser(user)

        const clock = sinon.useFakeTimers();
        app.rentBike(bike.id, user.email)
        const hour = 1000 * 60 * 60

        clock.tick(3 * hour)
        const rentAmount = app.returnBike(bike, user)
        expect(rentAmount).toEqual(300.0)
    })

    //rentbike
    it('should successfully rent a bike', async () => {
        const app = new App()
        const bike = new Bike('caloi mountainbike', 'mountain bike',
        1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        const user = new User('Joao', 'joao@mail.com', '12345')
        await app.addUser(user)
        app.rentBike(bike.id, user.email)

        expect(app.rents.length).toEqual(1)
        expect(app.rents[0].bike).toEqual(bike)
        expect(app.rents[0].user).toEqual(user)
    })

    //removeuser
    it('should handle user removal', async () => {
        const app = new App()
        const user = new User('Joao', 'joao@mail.com', '12345')
        await app.addUser(user)

        app.removeUser(user.email)
        expect(app.users.length).toEqual(0)
    })

    it('should not remove a user not found', () => {
        const app = new App()
        
        expect(() => {
            app.removeUser('fake@email.com')
        }).toThrow(UserNotFoundError)
    })

    //registerbike
    it('should successfully add a bike to the bikes array with a id', () => {
        const app = new App()
        const bike = new Bike('caloi mountainbike', 'mountain bike',
        1234, 1234, 100.0, 'My bike', 5, [])
        const newBikeId = app.registerBike(bike)

        expect(app.bikes.length).toEqual(1)
        expect(app.bikes[0].id).toEqual(newBikeId)
    })

    //finduser
    it('should find a user registered', async () => {
        const app = new App()
        const user = new User('Joao', 'joao@mail.com', '12345')
        const newId = await app.addUser(user)

        const search = app.findUser(user.email)

        expect(search).toEqual(user)
    })

    it('should throw user not found error', () => {
        const app = new App()

        expect(() => {
            app.findUser('fake@email.com')
        }).toThrow(UserNotFoundError)
    })

    //addusers
    it('should add a user to the users array', async () => {
        const app = new App()
        const user = new User('Joao', 'joao@mail.com', '12345')
        const newId = await app.addUser(user)

        expect(app.users.length).toEqual(1)
        expect(app.users[0].email).toEqual(user.email)
        expect(app.users[0].id).toEqual(newId)
    })

    it('should not register a user with an email already in use', async () => {
        const app = new App()
        const user = new User('Joao', 'joao@mail.com', '12345')
        await app.addUser(user)
        const user2 = new User('Jose', 'joao@mail.com', '234325')
        
        await expect(
            app.addUser(user2)
        ).rejects.toThrow(DuplicatedEmailError)
    })

    //verifyuser
    it('should verify a user successfully', async () => {
        const app = new App()
        const user = new User('Joao', 'joao@mail.com', '12345')
        const newId = await app.addUser(user)

        const verified = await app.verifyUser('joao@mail.com', '12345')
        
        expect(verified).toBeTruthy
    })

    it('should not verify a user with wrong password', async () => {
        const app = new App()
        const user = new User('Joao', 'joao@mail.com', '12345')
        const newId = await app.addUser(user)

        const verified = await app.verifyUser('joao@mail.com', 'senhaerrada')
        expect(verified).toBeFalsy
    })
})