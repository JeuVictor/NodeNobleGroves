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

    describe('given find compra by uid', ()=>{

        test('given sucess, then return status 200', async ()=>{
            const controller = new ComprasController({
                findByUid: () => Promise.resolve()
            });
            
            const request = {params: {uid: 1}};
            const response = new ResponseMock();
            await controller.findByUid(request, response);

            expect (response._status).toEqual(200);

        })
        test('given sucess, then return compra', async ()=>{
            const compra = {
                findByUid: () => Promise.resolve()
            }
            const controller = new ComprasController(compra);
            
            const request = {params: {uid: 1}};
            const response = new ResponseMock();
            await controller.findByUid(request, response);

            expect (response._json).toEqual(compra);

        })

        test('when fail, then return error status', async () =>{
            const controller = new ComprasController({
                findByUid: () => Promise.reject({ code: 500})
            });
            
            const request = {params: {uid: 1}};
            const response = new ResponseMock();
            await controller.findByUid(request, response);

            expect (response._json).toEqual({code: 500});

        } )
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

