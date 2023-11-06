import { Bike } from "./bike";
import { User } from "./user";

export class Rent {
    constructor (
        public bikeId: string,
        public userEmail: string,
        public start: Date,
        public id?: string,
        public end?: Date
    ) {}
}