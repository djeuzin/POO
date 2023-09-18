export class Bike {
    public available = true
    public latitude = undefined
    public longitude = undefined

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

    public onSuccess(position: any) {
        this.latitude = position.coords.latitude 
        this.longitude = position.coords.longitude

        console.log('Localização adquirida com sucesso')
    }
}