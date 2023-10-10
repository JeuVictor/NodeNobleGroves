import { ProdutoCatalogo } from "../model/modelCatalogo.js";

export class ContollerCatalogo{
    #catalogo

    constructor(catalogo){
        this.#catalogo = catalogo || new ProdutoCatalogo();
    }

    findByUser(request, response){
        this.#catalogo.user = request.user;

        return this.#catalogo.findByUidCatalogo().then(produtos =>{
            response.json(produtos);
        }).catch(error=>{
            response.status(error.code).json(error);
        });
    }
    findByUid(request, response){
        this.#catalogo.user = request.user;
        this.#catalogo.uid = request.uid

        return this.#catalogo.findByCatalogo().then(produtos =>{
            response.status(200).json(this.#catalogo);
        }).catch(error=>{
            response.status(error.code).json(error);
        });
    }

}