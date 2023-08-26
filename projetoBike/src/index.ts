import { Bike } from "./bike"
import { Cliente } from "./cliente"
import { Aluguel } from "./aluguel"

const bike1 = new Bike('Preto', 'Normal', true)
const cliente1 = new Cliente('Joao', '124521456')
const aluguel1 = new Aluguel()

aluguel1.alugar(cliente1, bike1)

const cliente2 = new Cliente('Jurandir', '545487542')

aluguel1.alugar(cliente2, bike1)

aluguel1.devolver(bike1)

aluguel1.alugar(cliente2, bike1)

console.log('testando compilação')