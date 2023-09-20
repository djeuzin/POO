import { App } from "./app"
import { Bike } from "./bike"
import { User } from "./user"
import { Location } from "./location"

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
    it('should return the right amount of payment', () => {
        const app = new App()
        const bike = new Bike('caloi mountainbike', 'mountain bike',
        1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        const user = new User('Joao', 'joao@mail.com', '12345')
        app.addUser(user)
        app.rentBike(bike.id, user.email)


    })

    //rentbike
    it('should successfully rent a bike', () => {
        const app = new App()
        const bike = new Bike('caloi mountainbike', 'mountain bike',
        1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        const user = new User('Joao', 'joao@mail.com', '12345')
        app.addUser(user)
        app.rentBike(bike.id, user.email)

        expect(app.rents.length).toEqual(1)
        expect(app.rents[0].bike).toEqual(bike)
        expect(app.rents[0].user).toEqual(user)
    })

    it('should throw an exeption of bike unavailabel')

    //removeuser
    //registerbike
    //finduser
    //addusers
    //verifyuser
})