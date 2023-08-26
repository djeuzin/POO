"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aluguel = void 0;
class Aluguel {
    alugar(resp, item) {
        var _a;
        if (item.disponibilidade) {
            this.responsavel = resp;
            item.disponibilidade = false;
            this.item = item;
            console.log('Cliente', this.responsavel.name, 'alugou a bike!');
            return;
        }
        console.log('Bike indisponível. O cliente ', (_a = this.responsavel) === null || _a === void 0 ? void 0 : _a.name, ' está com ela no momento.');
    }
    devolver(bicicleta) {
        var _a;
        console.log('O cliente', (_a = this.responsavel) === null || _a === void 0 ? void 0 : _a.name, 'devolveu a bike.');
        this.responsavel = undefined;
        this.item = undefined;
        bicicleta.disponibilidade = true;
    }
}
exports.Aluguel = Aluguel;
