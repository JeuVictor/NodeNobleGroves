import { badRequestError } from "../../errors/bad-request-error.js";

export function validandoCompras(request, response, next){
    const id = request.body.id;
    const qtd = request.body.quantidade;
    if (!id){
        return response.status(400).json(new badRequestError('ID não informado'))
    }
    if(!qtd){
        return response.status(400).json(new badRequestError('Quantidade não informada'))
    }
    if(isNaN(qtd)){
        return response.status(400).json(new badRequestError('Quantidade invalida'))
    }

    next();
}
 