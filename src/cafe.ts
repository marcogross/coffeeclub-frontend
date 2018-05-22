import { Component } from '@angular/core';
import { AppService } from "./app/app.service";

@Component({
    
})
export class Cafe {

    public id: number
    public nome: string
    public miniDescricao: string
    public descricao: string
    public preco: number
    public intensidade: number
    public perfilAromatico: string
    public variedade: string
    public imagem: string

    //Propriedade para controlar a quantidade de unidades de um objeto js de café na página inicial
    public qtd: number = 0

}