
import { Produto } from '../model/model.js'

export class ComprasController {
    findByUser(request, response){
        const compra = new Produto();
        compra.user = request.user;

        compra.findByUser().then(produtos =>{
            response.json(produtos);
        }).catch(error =>{
            response.status(error.code).json
        })
        
    }
}