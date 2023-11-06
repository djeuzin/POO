import { Location } from './location'
import { Rent } from './rent';

export class Bike {
    constructor(
        public name: string,
        public type: string,
        public bodysize: number,
        public maxLoad: number,
        public rate: number,
        public description: string,
        public ratings: number,
        public id?: string,
        public available = true,
        public latitude: string = '0',
        public longitude: string = '0'
    ) {}
}