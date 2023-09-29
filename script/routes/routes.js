import express, { response }  from "express";
import admin from 'firebase-admin';
import {authenticateToken}  from "../middlewares/authanticate-jwt.js";
import { ComprasController } from "../controller/controllerCompra.js";

const app = express()
const compraController = new  ComprasController();

app.get('/', 
    (request, response, next) => authenticateToken(request, response, next, admin.auth()), 
    (request, response) => compraController.findByUser(request, response)
    );
app.get('/:uid',
    (request, response, next) => authenticateToken(request, response, next, admin.auth()), 
    (request, response) => compraController.findByUid(request, response)
);    
app.post('/',

    (request, response, next) => authenticateToken(request, response, next, admin.auth()),
    (request, response) => compraController.create(request, response)
    );

export const comprasRoutes = app;