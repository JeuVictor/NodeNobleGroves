
import { ProdutoNaoEncontrado } from "../../../errors/produto-Nao-Encontrado-error.js";
import { ProdutoUidNaoInformado } from "../../../errors/produto-uid-not-informed-error.js";
import { UserNotInformedError } from "../../../errors/user-not-informed-error.js";

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

            await model.findByUid();
            

            expect(model).toEqual(criandoCompra());

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

        function criandoCompra(){
            
            const produto = new Produto();
            produto.uid =1;
            produto.id = 20;
            produto.idBtn =  300;
            produto.medida = 'kg';
            produto.nome = 'Café';
            produto.preco = {
                custo: 59.99,
                moeda: "R$"
            }
            produto.promo = false;
            produto.quantidade = 1;
            produto.type ='oferta centralizar bebida'
            produto.user = {
                uid: "anyUserUid"
            }
            return produto
        }
    })

});
