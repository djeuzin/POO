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
})