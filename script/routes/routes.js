import express from "express";
import {authenticateToken}  from "../middlewares/authanticate-jwt.js";
import { ComprasController } from "../controller/controllerCompra.js";

const app = express()
const compraController = new  ComprasController();

app.get('/', authenticateToken, compraController.findByUser);

export const comprasRoutes = app;