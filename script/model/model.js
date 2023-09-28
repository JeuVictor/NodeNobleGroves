import { ProdutoNaoEncontrado } from '../../errors/produto-Nao-Encontrado-error.js';
import { ProdutoUidNaoInformado } from '../../errors/produto-uid-not-informed-error.js';
import { UserNotInformedError } from '../../errors/user-not-informed-error.js';
import { ComprasRepositorio } from '../repositorio/repository.js';

export class Produto {
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
    #repositorio;
    constructor(produtoRespositorio){
        this.#repositorio = produtoRespositorio || new ComprasRepositorio();
    }

    findByUser() {
        if(!this.user?.uid){
            return Promise.reject(new UserNotInformedError())
        }
        return this.#repositorio.findByUserUid(this.user.uid);

    }
    findByUid(){
        if(!this.uid){
            return Promise.reject(new ProdutoUidNaoInformado())
        }
        return this.#repositorio.findByUid(this.uid).then(produtoDb =>{
            if(!produtoDb){
                return Promise.reject(new ProdutoNaoEncontrado());
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
    };

}