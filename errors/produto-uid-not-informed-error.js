export class ProdutoUidNaoInformado extends Error{
    constructor (){
        super('Uid do produto não informado');
        this.name = 'transaction-uid-not-informed'
        this.code = 500;
    }
}