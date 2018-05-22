import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Cafe } from '../cafe';
import { PedidoFuncionario } from '../pedidoFuncionario';
import { ItemPedidoFuncionario } from '../itemPedidoFuncionario';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';

  getAddItemFeedbackPositivo(): string {
    return "Adicionando.";
  }
  getAddItemFeedbackNegativo(): string {
    return "Informe quantidade.";
  }

  addItemFeedbackResultado: string = this.getAddItemFeedbackNegativo();


  //Cafe Variaveis
  cafe: Cafe = new Cafe()
  cafes: Cafe[] = []
  cafeDetalhe: Cafe;

  //ItemPedidoFuncionario Variaveis
  itemPedidoFuncionario: ItemPedidoFuncionario = new ItemPedidoFuncionario()
  //itensPedidoAtual: ItemPedidoFuncionario[] = []
  itensPedidoAtual = new Array<ItemPedidoFuncionario>();

  //PedidoFuncionario Variaveis
  pedidoAtualFuncionario: PedidoFuncionario = new PedidoFuncionario()

  constructor(private srvc: AppService) {

  }

  ngOnInit() {
    //this.inserirCafe();
    this.getAllCafes();
  }

  //Cafe Métodos/////////////////////////////////////////////////
  getAllCafes() {
    this.srvc.buscarCafes().subscribe((cafesRest: Cafe[]) => {
      this.cafes = cafesRest;
    });
  }

  qtdCafeAumentar(cafe: Cafe, id: string){
    if(cafe.qtd == null || cafe.qtd == 0){
      cafe.qtd = 1;
    }
    else {
      cafe.qtd++;  
    }
  }

  qtdCafeDiminuir(cafe: Cafe){
    if(cafe.qtd == null || cafe.qtd == 0){
      cafe.qtd = 0;
    }
    else if(cafe.qtd > 0) {
      cafe.qtd--;
    }
  }

  detalharCafe(cafe: Cafe){
    this.cafeDetalhe = cafe;
    
  }

  getCafe(){
    //Nossa aplicação busca dados de forma assíncrona (a aplicação é ligada diretamente a um banco de dados específico.)
    //Para tratar requisições assíncronas no Angular, utilizamos o método subscribe.
    //O método subscribe é um "intermediador" entre o tempo que leva para se conseguir uma resposta com os dados do banco(um response) e o comando que queremos aplicar especificado em um método de nossa classe.
    //Quando utilizamos o subscribe, precisamos passar a ele como parâmetro o que vai acontecer com aquela resposta de dados(também entendida pelo angular como uma response), através de alguma função.
    //Podemos atribuir ao parÂmetro do subscribe um método (ex: .subscribe(this.meuMetodo)) ou uma função anônima, usando arrow functions, algo muito comum de se usar com o subscribe.
    //Ex de subscribe com função anônima: .subscribe(response => {console.log(response);});

    /*
    this.srvc.buscarCafe(this.cafeDetalheId).subscribe((cafeRest: Cafe) => {
      this.cafeDetalhe = cafeRest;
    });
    */
  }

  inserirCafe(cafe: Cafe): any {
    this.srvc.InserirCafe(cafe).subscribe(res => {
      console.log("Inserido com sucesso!")
    })
  }


  registrarCafe(){
    //Referenciando os valores dos inputs em variáveis
    //Criando novo objeto Cafe
    let novoCafe = new Cafe();
    //Acrescentando os valores no novo objeto
    novoCafe.nome = (<HTMLSelectElement>document.getElementById('insert_cafe_nome')).value;
    novoCafe.miniDescricao = (<HTMLSelectElement>document.getElementById('insert_cafe_mini_descricao')).value;
    novoCafe.descricao = (<HTMLSelectElement>document.getElementById('insert_cafe_descricao')).value;
    novoCafe.preco = parseFloat( (<HTMLSelectElement>document.getElementById('insert_cafe_preco')).value );
    novoCafe.intensidade = parseInt( (<HTMLSelectElement>document.getElementById('insert_cafe_intensidade')).value );
    novoCafe.perfilAromatico = null;
    novoCafe.variedade = (<HTMLSelectElement>document.getElementById('insert_cafe_variedade')).value;
    novoCafe.imagem = (<HTMLSelectElement>document.getElementById('insert_cafe_imagem')).value;
    //Se usuário não inserir uma imagem, inserimos a imagem de café padrão
    if(novoCafe.imagem == null || novoCafe.imagem == ""){
      novoCafe.imagem = "https://www.nespresso.com/ecom/medias/sys_master/public/9148240461854.png";
    }
    //Insere o café no banco
    this.inserirCafe(novoCafe);
  }


  //ItemPedidoFuncionario Métodos/////////////////////////////////////////////////
  qtdAumentar(item: ItemPedidoFuncionario){
    if(item.quantidade = null){
      item.quantidade = 0;
    }
    item.quantidade++;
  }

  qtdDiminuir(item: ItemPedidoFuncionario){
    if(item.quantidade = null){
      item.quantidade = 0;
    }
    else if(item.quantidade > 0) {
      item.quantidade--;
    }
  }

  adicionarItem(cafe: Cafe, quantidade: number){
    //Verifica se o café passado não possui qtd = 0
    if (quantidade > 0){
      //Verifica se o café passado já existe na lista de itens do pedido
      let mesmoItem: boolean = false;
      for (let i=0; i < this.itensPedidoAtual.length ; i++ ){
        //Se existir, apenas acrescenta o valor da quantidade do café na lista de itens do pedido
        if (cafe == this.itensPedidoAtual[i].cafe){
          this.itensPedidoAtual[i].quantidade += cafe.qtd;
          mesmoItem = true;
        }
      }
      //Se o café já existir na lista, apenas atualizamos ela com a nova qtd daquele café
      if(mesmoItem == true){
        this.pedidoAtualFuncionario.itenspedidofuncionario = this.itensPedidoAtual;
        this.getAllItensPedido();  
      }
      //Se o café não existir na lista, acrescentamos ele
      else {
        this.itemPedidoFuncionario.cafe = cafe;
        this.itemPedidoFuncionario.quantidade = quantidade;
        this.itensPedidoAtual.push(this.itemPedidoFuncionario);
        this.pedidoAtualFuncionario.itenspedidofuncionario = this.itensPedidoAtual;
        this.getAllItensPedido();
        this.itemPedidoFuncionario = new ItemPedidoFuncionario;
      }
      //Por fim, zeramos o valor da qtd do café na lista de cafés da home
      cafe.qtd = 0;
      //E preenchemos o valor total do pedidoAtualFuncionario
      this.pedidoAtualFuncionario.valorTotal = this.getValorTotalPedido(this.pedidoAtualFuncionario.itenspedidofuncionario);
      
      //Insira o feedback de sucesso no dropup do botão
      this.addItemFeedbackResultado = this.getAddItemFeedbackPositivo();


      /*
      alert(this.itensPedidoAtual.length);//Retorna ok, length = 0
      this.itemPedidoFuncionario.cafe = cafe;
      this.itemPedidoFuncionario.quantidade = quantidade;
      alert(this.itemPedidoFuncionario.cafe.nome);//Retorna ok, o código anterior funcionou
      alert(this.itemPedidoFuncionario.quantidade);//Retorna ok, o código anterior funcionou

      this.itensPedidoAtual.push(this.itemPedidoFuncionario);
      alert(this.itensPedidoAtual.length);//Retorna ok, o código anterior funcionou
      this.pedidoAtualFuncionario.itenspedidofuncionario = this.itensPedidoAtual;

      this.getAllItensPedido();
      this.itemPedidoFuncionario = new ItemPedidoFuncionario;
      */
    }
    else {
      //Caso a quantidade for inferior ou igual a zero
      this.addItemFeedbackResultado = this.getAddItemFeedbackNegativo();
    }
    

  }

  getAllItensPedido() {

    this.itensPedidoAtual = this.pedidoAtualFuncionario.itenspedidofuncionario;
  }

  getValorTotalPedido(listaItenspedido: ItemPedidoFuncionario[]): number{
    let valor: number = 0;
    for (let i=0; i < listaItenspedido.length; i++){
      valor += (listaItenspedido[i].quantidade * listaItenspedido[i].cafe.preco);
    }
    return valor; //.parseFloat(valor.toFixed(2));
  }


  //PedidoFuncionario Métodos/////////////////////////////////////////////////
  excluirItem(item: ItemPedidoFuncionario){
    var index =  this.itensPedidoAtual.indexOf(item);
    this.itensPedidoAtual.splice(index, 1);
    this.pedidoAtualFuncionario.valorTotal =  this.getValorTotalPedido(this.pedidoAtualFuncionario.itenspedidofuncionario);
  }

  inserirPedidoFuncionario(pedido: PedidoFuncionario): any {
    console.log(this.itensPedidoAtual);
    pedido.itenspedidofuncionario = this.itensPedidoAtual;
    console.log(pedido.itenspedidofuncionario);
    this.srvc.inserirPedidoFuncionario(pedido).subscribe(res => {
      console.log("Inserido com sucesso!")
    })
  }

}


