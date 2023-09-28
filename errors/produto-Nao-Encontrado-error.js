export class ProdutoNaoEncontrado extends Error {
    constructor(){
        super('Produto não encontrado')
        this.name = 'produto-Nao-Encontrado'
        this.code = 404
    }
}