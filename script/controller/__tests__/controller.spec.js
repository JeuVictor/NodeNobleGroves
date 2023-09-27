import { ComprasController } from "../controllerCompra.js";


describe('Compras controller', () =>{

    let request;
    let response;

    beforeEach(() =>{
        request = {};
        response = new ResponseMock();
    })

    test('given find buy by user, when sucess, then return buy', (done) =>{
        const compras = [{uid: 1}, {uid: 2}];
        
        const controller = new ComprasController({
            findByUser: ()=> Promise.resolve(compras)
        });
     

        controller.findByUser(request, response).then(() => {
            expect(response._json).toEqual(compras);
            done();
        }) 

    })

    test ('Caso de error', (done)=>{
        const error = {code: 500};
        const controller = new ComprasController({
            findByUser: ()=> Promise.reject(error)
        });

        controller.findByUser(request, response).then(() =>{
            expect(response._status).toEqual(500)
            done();
        })
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

