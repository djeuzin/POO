export class Bike {
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