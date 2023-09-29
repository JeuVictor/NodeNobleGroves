import { response } from 'express';
import { ProdutoNaoEncontrado } from '../../errors/produto-Nao-Encontrado-error.js';
import { ProdutoUidNaoInformado } from '../../errors/produto-uid-not-informed-error.js';
import { UserNotInformedError } from '../../errors/user-not-informed-error.js';
import { UsuarioNaoFezCompra } from '../../errors/usuario-nao-fez-compra-error.js';
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
    };
    create(params){
        this.id = params.id
        this.idBtn = params.idBtn;
        this.idBtnOk = params.idBtnOk;
        this.medida = params.medida;
        this.nome = params.nome;
        this.preco = params.preco
        this.promo = params.promo;
        this.quantidade = params.quantidade;
        this.type = params.type;
        this.user = params.user;
        
        return this.#repositorio.save(this).then( response =>{
            this.uid = response.uid;
        })
    }

}