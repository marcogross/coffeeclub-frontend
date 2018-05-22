import { Cafe } from "./cafe";

export class ItemPedidoFuncionario {

    public id: number
    public cafe: Cafe
    public quantidade: number = 0

    constructor(){}

    /*
    constructor(cafe: Cafe, quantidade: number){
        this.cafe = cafe;
        this.quantidade = quantidade;
    }
    */
}