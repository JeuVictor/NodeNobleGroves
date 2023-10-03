import express  from "express";
import admin from 'firebase-admin';
import {authenticateToken}  from "../middlewares/authanticate-jwt.js";
import { ComprasController } from "../controller/controllerCompra.js";
import { validandoCompras } from "../validators/criando-compras.validacao.js";

const app = express()

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
    (request, response) => new CompraController().update(request, response)
    )
app.delete('/:uid',
    (request, response, next) => authenticateToken(request, response, next, admin.auth()),
    (request, response) => new ComprasController().delete(request, response)

    )    
export const comprasRoutes = app;