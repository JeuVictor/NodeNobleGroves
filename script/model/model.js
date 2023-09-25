import admin from 'firebase-admin';
import { ComprasRepositorio } from '../repositorio/repository.js';

export class Produto{
    id;
    idBtn;
    idBtnOk;
    medida
    nome;
    preco;
    promo;
    quantidade;
    type;
    #repositorio;
    constructor(){
        this.#repositorio = new ComprasRepositorio();
    }

    findByUser() {
        if(!this.user?.uid){
            return Promise.reject({
                code: 500,
                message: "Usuario não informado"
            })
        }
        return this.#repositorio.findByUserId(this.user.uid);

    }

}