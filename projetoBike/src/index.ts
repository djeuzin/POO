import { App } from "./app";
import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";

const runningApp = new App()
const bike = new Bike('mountain bike', 'mountain', 123, 150, 100.5, 'desc', 5, [])
const bike2 = new Bike('bike2', 'medium', 2, 120, 80, 'boa', 5, [])
const user = new User('Joao', 'joao@email.com', '123456789')
const user2 = new User('Aabraao', 'aab@mail.com', '12345')
const user3 = new User('Joao2', 'josao@mail.com', '13241234')
const today = new Date()
const twoDaysFromToday = new Date()
twoDaysFromToday.setDate(twoDaysFromToday.getDate() + 2)
const day3 = new Date()
day3.setDate(twoDaysFromToday.getDate() + 1)
const day4 = new Date()
day4.setDate(day3.getDate() + 3)

runningApp.addUser(user)
runningApp.addUser(user2)
runningApp.addUser(user3)
runningApp.registerBike(bike)
runningApp.registerBike(bike2)
runningApp.rentBike(bike, user, today, day3)
runningApp.rentBike(bike2, user, today, twoDaysFromToday)
runningApp.rentBike(bike2, user2, day3, day4)
console.log(runningApp.users)
console.log(runningApp.bikes)
console.log(runningApp.rents)