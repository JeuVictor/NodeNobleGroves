export class UsuarioNaoFezCompra extends Error{

    constructor(){
        super('Usuario não autorizado')
        this.name = 'Usuario-Nao-fez-compra'
        this.code = 403
    }
}