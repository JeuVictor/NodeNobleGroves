
import { ProdutoNaoEncontrado } from "../../../errors/produto-Nao-Encontrado-error.js";
import { ProdutoUidNaoInformado } from "../../../errors/produto-uid-not-informed-error.js";
import { UserNotInformedError } from "../../../errors/user-not-informed-error.js";
import { UsuarioNaoFezCompra } from "../../../errors/usuario-nao-fez-compra-error.js";

import { Produto } from "../model.js";

describe("Produto model, dado encontrar usuário por uid, quando o usuário: ", () => {

    const produtoRepositoryMock = {
        findByUserUid: () => Promise.resolve([
            {uid: "Compra1"}, {uid: "Compra2"}
        ])
    };

    test(" não for informado, então retorne o erro 500 " , async () => {
        const model = new Produto();

       const response = model.findByUser();

       await expect(response).rejects.toBeInstanceOf(UserNotInformedError);
    });

    test(" uid não for informado, então retorne o erro 500" , async () => {
        const model = new Produto();
        model.user = {};

        const response = model.findByUser();

        await expect(response).rejects.toBeInstanceOf(UserNotInformedError);
    });

    test("for informado, retorne o erro 500" , async () => {
        const model = new Produto(produtoRepositoryMock);
        model.user ={uid: "anyUserUid"};

       const response = model.findByUser();

        await expect(response).resolves.toEqual([
            {uid: "Compra1"}, {uid: "Compra2"}
        ]);
    });

    describe ('given find transaction by uid', ()=>{

        test('then return transaction', async ()=>{
            
            const model = new Produto({
                findByUid: () => Promise.resolve(criandoCompra())
            });
            model.uid = 1;
            model.user = {uid: "anyUserUid"};

            await model.findByUid();
            

            expect(model).toEqual(criandoCompra());
        })

        test('when user doesnt onw transaction, then return 403 error ', async () => {

            const comprasDb = criandoCompra();
            comprasDb.user = {uid: "anyOtherUserUid"}

            const model = new Produto({
                findByUid: () => Promise.resolve(comprasDb)
            });
            model.uid = 9;
            model.user = {uid: "anyUserUid"};

            await expect(model.findByUid()).rejects.toBeInstanceOf(UsuarioNaoFezCompra);

        })

        test('when uid not present, then return error 500', async ()=>{
            const model = new Produto();

            await expect(model.findByUid()).rejects.toBeInstanceOf(ProdutoUidNaoInformado);

        })

        test('when product not found, then return error 404', async () =>{
            const model = new Produto({
                findByUid: () => Promise.resolve(null)
            });

            model.uid = 9;

            await expect(model.findByUid()).rejects.toBeInstanceOf(ProdutoNaoEncontrado);
        })

        
    })

    describe ('given create new buy', ()=>{

        const params = {
            id: 1,
            idBtn:  20,
            idBtnOk: 300,
            medida: 'anyKg',
            nome: 'anyName',
            preco: {
                custo: 1,
                moeda: "anymoeda"
            },
            promo: false,
            quantidade: 1,
            type: 'oferta centralizar bebida',
            user: {
                uid: "anyUserUid"
            }
        };
        const repositoryMock = {
            _hasSaved: false,
            save() {
                this._hasSaved = true;
                return Promise.resolve({uid: 1})
            }
           }

        test('then return new buy', async ()=>{
            const model = new Produto(repositoryMock);

            await model.create(params);

            const novaCompra = criandoCompra();

            expect(model).toEqual(novaCompra);
        })
        test('then save buy', async ()=>{
           
            const model = new Produto(repositoryMock)

            await model.create(params)

            expect(repositoryMock._hasSaved).toBeTruthy();
        })
    })

    describe('given update buy', ()=>{
        let repositoryMock;
        
        beforeEach(()=>{
            repositoryMock = {
                _hasUpdate: false,
                findByUid(){
                    return Promise.resolve({user: {uid: "anyUserUid"}})
                } ,
                update(){
                    this._hasUpdate =  true;
                    return Promise.resolve();
                }
            }
        })

        test('then return update buy', async ()=>{
            
            const model = new Produto(repositoryMock);
            model.uid =1;
            model.user = {uid: 'anyUserUid'};
            const updateCompra = criandoCompra();

            const params = criandoCompra();
            await model.update(params);
            
            expect(model).toEqual(updateCompra);
        })
        test('then update buy', async ()=>{
            
            const model = new Produto(repositoryMock);
            model.uid =1;
            model.user = {uid: 'anyUserUid'};

            const params = criandoCompra();
            await model.update(params);
            
            expect(repositoryMock._hasUpdate).toBeTruthy();
        })
        test('when transaction doesnt belong to user, then return error', async ()=>{
            
            const model = new Produto({
                findByUid: () => Promise.resolve({user: {uid: "anyOtherUserUid"}})
            });
            model.uid =1;
            model.user = {uid: 'anyUserUid'};

            const params = criandoCompra();
            
            await expect(model.update(params)).rejects.toBeInstanceOf(UsuarioNaoFezCompra)
        })
        test('when transaction doesnt exist, then return not found error', async ()=>{
            
            const model = new Produto({
                findByUid: () => Promise.resolve(null)
            });
            model.uid =1;
            model.user = {uid: 'anyUserUid'};

            const params = criandoCompra();
            
            await expect(model.update(params)).rejects.toBeInstanceOf(ProdutoNaoEncontrado)
        })
    })

    function criandoCompra(){
            
        const produto = new Produto();
        produto.uid =1;
        produto.id = 1;
        produto.idBtn =  20;
        produto.idBtnOk = 300
        produto.medida = 'anyKg';
        produto.nome = 'anyName';
        produto.preco = {
            custo: 1,
            moeda: "anymoeda"
        }
        produto.promo = false;
        produto.quantidade = 1;
        produto.type ='oferta centralizar bebida'
        produto.user = {
            uid: "anyUserUid"
        }
        return produto
    }

});
