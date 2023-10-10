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
    describe('given create new buy', () => {

            test('when success, then return status 200', async ()=>{
                const controller = new ComprasController({
                    create: () => Promise.resolve()
                });
                const request = {body: {}};
                const response = new ResponseMock();

                await controller.create(request, response);

                expect(response._status).toEqual(200)
            })
            test('when success, then return buy', async ()=>{
                const compra = {
                    create: () => Promise.resolve()
                }
                const controller = new ComprasController(compra);
                const request = {body: {}};
                const response = new ResponseMock();
                
                await controller.create(request, response);
                
                expect(response._json).toEqual(compra)
            })
            test('then buy should belong to user on request', async ()=>{
                const compra = {
                    create: () => Promise.resolve()
                }
                const controller = new ComprasController(compra);
                const request = {body: {}, user: {uid: "anyUserUid"}};
                const response = new ResponseMock();

                await controller.create(request, response);
                
                expect(response._json.user).toEqual({uid: "anyUserUid"})
            })
            test('when fail, then return error status 500', async ()=>{
                const controller = new ComprasController({
                    create: () => Promise.reject({code: 500})
                });
                const request = {body: {}};
                const response = new ResponseMock();
    
                await controller.create(request, response);
    
                expect(response._status).toEqual(500)
            })
            test('when fail, then return error', async ()=>{
                const controller = new ComprasController({
                    create: () => Promise.reject({code: 500})
                });
                const request = {body: {}};
                const response = new ResponseMock();
    
                await controller.create(request, response);
    
                expect(response._json).toEqual({code: 500})
            })
        })

        describe('given update transaction', ()=>{
            const user = {uid: "anyUserUid"}
            const request = { params: {uid: 1}, user};
            let response;
            let model;

            beforeEach(() =>{
                response = new ResponseMock();
                model = {
                    _HasUpdated: false,
                    update(){
                        this._HasUpdated = true;
                        return Promise.resolve();
                    }
                }
            })

            test('when success, then return status 200 ', async ()=>{
                const controller = new ComprasController(model);

                await controller.update(request, response)

                expect(response._status).toEqual(200)

            })
            test('when success, then return updated buy ', async ()=>{
                const controller = new ComprasController(model);

                await controller.update(request, response)

                expect(response._json).toEqual(model)

            })
            test('then buy should belong to user on request', async ()=>{
                const controller = new ComprasController(model);

                await controller.update(request, response)

                expect(response._json.user).toEqual(user)

            })
            test('then buy should have uid from request', async ()=>{
                const controller = new ComprasController(model);

                await controller.update(request, response)

                expect(response._json.uid).toEqual(1)

            })
            test('then update buy', async ()=>{
                const controller = new ComprasController(model);

                await controller.update(request, response)

                expect(model._HasUpdated).toBeTruthy();

            })
            test('when fail, then return error status', async ()=>{
                const controller = new ComprasController({
                    update: () => Promise.reject({code: 500}) 
                });
                await controller.update(request, response)

                expect(response._status).toEqual(500)

            })
            test('when fail, then return error', async ()=>{
                const controller = new ComprasController({
                    update: () => Promise.reject({code: 500}) 
                });
                await controller.update(request, response)

                expect(response._json).toEqual({code: 500})

            })
        })
        
        describe('given remove transaction', ()=>{

            let request;
            let response;
            const model ={
                _hasDeleted:false,
                delete(){
                    this._hasDeleted = true;
                   return Promise.resolve();
                }
            }
            const user = {uid: "anyUserUid"};

            beforeEach(()=>{
                request ={params: {uid: 1}, user};
                response = new ResponseMock()
            })

            test('when success, then return status 200', async ()=>{
                const controller = new ComprasController(model);

                await controller.delete(request, response);

                expect(response._status).toEqual(200)
            })
            test('then remove buy', async ()=>{
                const controller = new ComprasController(model);

                await controller.delete(request, response);

                expect(model._hasDeleted).toBeTruthy();
            })
            test('then buy should belong to user from request', async ()=>{
                const controller = new ComprasController(model);

                await controller.delete(request, response);

                expect(model.user).toEqual(user);
            })
            test('then buy should have uid from request', async ()=>{
                const controller = new ComprasController(model);

                await controller.delete(request, response);

                expect(model.uid).toEqual(1);
            })
            test('when error, then return error status', async ()=>{
                const controller = new ComprasController({
                    delete:()=> Promise.reject({code: 500})
                });

                await controller.delete(request, response);

                expect(response._status).toEqual(500);
            })
            test('when error, then return error', async ()=>{
                const controller = new ComprasController({
                    delete:()=> Promise.reject({code: 500})
                });

                await controller.delete(request, response);

                expect(response._json).toEqual({code: 500});
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

