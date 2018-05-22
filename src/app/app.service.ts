import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { Cafe } from '../cafe';
import { Observable } from 'rxjs/Rx';
import { PedidoFuncionario } from '../pedidoFuncionario';

@Injectable()
export class AppService {

  url: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

//Café métodos
  buscarCafes(): Observable<Cafe[]>{
    return this.http.get<Cafe[]>(`${this.url}/cafes`);
  }

  buscarCafe(id: number){
    return this.http.get(`${this.url}/cafes/` + id);
  }

  InserirCafe(cafe: Cafe){
    return this.http.post(`${this.url}/cafes`, cafe);

  }

  DeletarCafe(id: number){
    return this.http.delete(`${this.url}/cafes` + id);
  }

//PedidoFuncionario métodos
buscarPedidosFuncionario(id: number) {
  return this.http.get(`${this.url}/pedidosFuncionario/` + id);
}

buscarPedido(id: number){
  return this.http.get(`${this.url}/cafes/` + id);
}

inserirPedidoFuncionario(pedido: PedidoFuncionario){
  return this.http.post(`${this.url}/pedidosFuncionario`, pedido);

}

}
