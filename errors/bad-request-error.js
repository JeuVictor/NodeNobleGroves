export class badRequestError extends Error{
    constructor(description) {
        super();
        this.message = description;
        this.name = 'bad-request-error';
        this.code = 400;
    }
}