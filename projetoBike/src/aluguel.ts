import { Bike } from "./bike";
import { Cliente } from "./cliente"

export class Aluguel {
    responsavel: Cliente | undefined
    item: Bike | undefined
 
    alugar(resp: Cliente, item: Bike): void{
        if(item.disponibilidade){
            this.responsavel = resp
            item.disponibilidade = false
            this.item = item

            console.log('Cliente', this.responsavel.name, 'alugou a bike!')
            return
        }


        console.log('Bike indisponível. O cliente ', this.responsavel?.name, ' está com ela no momento.')
    }

    devolver(bicicleta: Bike): void {
        console.log('O cliente', this.responsavel?.name, 'devolveu a bike.')
        this.responsavel = undefined
        this.item = undefined
        bicicleta.disponibilidade = true
    }
}