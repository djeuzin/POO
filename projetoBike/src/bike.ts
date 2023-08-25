import { Cliente } from "./cliente"

export class Bike {
    constructor (
        public cor: string,
        public tamanho: string,
        public disponibilidade: boolean
    ) {}
}