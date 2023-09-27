
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
});
