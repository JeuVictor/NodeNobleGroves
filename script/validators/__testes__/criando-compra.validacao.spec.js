import { badRequestError } from "../../../errors/bad-request-error";
import { validandoCompras } from "../criando-compras.validacao"

describe('Create buy validator', ()=>{

    
    let request;
    let response;

    beforeEach(()=> {
        request =
         {body: 
            {
                id: 1,
                quantidade: 2
            }
         };

        response = new ResponseMock();
    })

    test('given id not informed, then return 400 error', () =>{
        request.body.id = null
        
        validandoCompras(request, response);

        expect(response._status).toEqual(400)
    })
    test('given id not informed, then return error', () =>{
        request.body.id = null
        
        validandoCompras(request, response);

        expect(response._json).toBeInstanceOf(badRequestError)
    })

    test('given qtd not informed, then return 400 error', () =>{
        request.body.quantidade = null;
        validandoCompras(request, response);

        expect(response._status).toEqual(400)
    })
    test('given qtd not informed, then return error', () =>{
        request.body.quantidade = null;
        validandoCompras(request, response);

        expect(response._json).toBeInstanceOf(badRequestError)
    })

    test('given qtd not informed, then return 400 error', () =>{
        request.body.quantidade = 'quantidaInvalida';
        validandoCompras(request, response);

        expect(response._status).toEqual(400)
    })
    
    
    test('given qtd not informed, then return error', () =>{
        request.body.quantidade = 'quantidaInvalida';
        validandoCompras(request, response);

        expect(response._json).toBeInstanceOf(badRequestError)
    })

    test('given buy is valid, then go to next stop', ()=>{
        let hasCalledNext = false;
        const next = () => { hasCalledNext = true};

        validandoCompras(request, response, next)

        expect(hasCalledNext).toBeTruthy();
    })

    class ResponseMock{
        _json = null;
        _status = null;
        json(value){
        this._json = value;
    }
    status(value){
        this._status = value;
        return this;
    }
}
})