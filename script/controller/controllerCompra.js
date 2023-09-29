
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
    findByUid(request, response){
        this.#compra.uid = request.params.uid;
        this.#compra.user = request.user;

        return this.#compra.findByUid().then(()=>{
            response.status(200).json(this.#compra);
        }).catch(error =>{
            response.status(error.code).json(error)
        })
        
    }
    create(request, response){
        this.#compra.user = request.user

        return this.#compra.create(request.body).then(()=>{
            response.status(200).json(this.#compra)
        }).catch(error =>{
            response.status(error.code).json(error)
        })

    }
}