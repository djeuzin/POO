import { Location } from './location'

export class Bike {
    public available = true
    public position = new Location(0.0, 0.0)

    constructor(
        public name: string,
        public type: string,
        public bodysize: number,
        public maxLoad: number,
        public rate: number,
        public description: string,
        public ratings: number,
        public imageUrls: string[],
        public id?: string
    ) {}
}