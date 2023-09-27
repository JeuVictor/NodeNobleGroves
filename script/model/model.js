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

}