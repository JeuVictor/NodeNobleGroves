import { CatalogoRepositorio } from "../repositorio/repository.js";

export class ProdutoCatalogo{
    id;
    idBtn;
    idBtnOk;
    medida
    nome;
    preco;
    promo;
    quantidade;
    type;
    user;

    #repositorio
    
    constructor(catalogoRepositorio){
        this.#repositorio = catalogoRepositorio || new CatalogoRepositorio();
    }

    
    findByUidCatalogo(){
        if (!this.user?.uid){
            return Promise.reject(new UserNotInformedError())
        }
        return this.#repositorio.findByUid(this.user.uid);
    }

    findByCatalogo(){
        if(!this.uid){
            return Promise.reject(new ProdutoUidNaoInformado())
        }
        return this.#repositorio.findByUidData(this.uid).then(produtoDb =>{
        if(!produtoDb){
                return Promise.reject(new ProdutoNaoEncontrado());
            }
        if(this.user.uid != produtoDb.user.uid){
                return Promise.reject(new UsuarioNaoFezCompra() );
            }
            this.id = produtoDb.id
            this.idBtn = produtoDb.idBtn;
            this.idBtnOk = produtoDb.idBtnOk;
            this.medida = produtoDb.medida;
            this.nome = produtoDb.nome;
            this.preco = produtoDb.preco
            this.promo = produtoDb.promo;
            this.quantidade = produtoDb.quantidade;
            this.type = produtoDb.type;
            this.user = produtoDb.user;
        })
    }

}