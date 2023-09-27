
import { Produto } from '../model/model.js'

export class ComprasController {

    #compra
    constructor (compra){
        this.#compra = compra || new Produto();
    }

    findByUser(request, response){
        this.#compra.user = request.user;

        return this.#compra.findByUser().then(produtos =>{
            response.json(produtos);
        }).catch(error => {
             response.status(error.code).json(error);
        })
        
    }
}