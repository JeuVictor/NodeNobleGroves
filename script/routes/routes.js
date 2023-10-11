import express  from "express";
import admin from 'firebase-admin';
import {authenticateToken}  from "../middlewares/authanticate-jwt.js";
import { ComprasController } from "../controller/controllerCompra.js";
import { validandoCompras } from "../validators/criando-compras.validacao.js";
import {ContollerCatalogo} from "../controller/controllerCatalogo.js"

const app = express()
const appC = express()

app.get('/', 
    (request, response, next) => authenticateToken(request, response, next, admin.auth()), 
    (request, response) =>  new ComprasController().findByUser(request, response)
    );
app.get('/:uid',
    (request, response, next) => authenticateToken(request, response, next, admin.auth()), 
    (request, response) =>  new ComprasController().findByUid(request, response)
);    
app.post('/',

    (request, response, next) => validandoCompras(request, response, next),
    (request, response, next) => authenticateToken(request, response, next, admin.auth()),
    (request, response) =>  new ComprasController().create(request, response)
    );
    
app.patch('/:uid',
    (request, response, next) => validandoCompras(request, response, next),
    (request, response, next) => authenticateToken(request, response, next, admin.auth()),
    (request, response) => new ComprasController().update(request, response)
    )
app.delete('/:uid',
    (request, response, next) => authenticateToken(request, response, next, admin.auth()),
    (request, response) => new ComprasController().delete(request, response)

    )    
    
export const comprasRoutes = app;

    appC.get('/', 
        (request, response, next) => authenticateToken(request, response, next, admin.auth()),
        (request, response)=> new ContollerCatalogo().findByUser(request, response));

export const catalogoRoutes = appC;