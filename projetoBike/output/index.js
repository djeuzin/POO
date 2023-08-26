"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bike_1 = require("./bike");
const cliente_1 = require("./cliente");
const aluguel_1 = require("./aluguel");
const bike1 = new bike_1.Bike('Preto', 'Normal', true);
const cliente1 = new cliente_1.Cliente('Joao', '124521456');
const aluguel1 = new aluguel_1.Aluguel();
aluguel1.alugar(cliente1, bike1);
const cliente2 = new cliente_1.Cliente('Jurandir', '545487542');
aluguel1.alugar(cliente2, bike1);
aluguel1.devolver(bike1);
aluguel1.alugar(cliente2, bike1);
console.log('testando compilação');