import express from "express";
import admin from 'firebase-admin';
import { comprasRoutes } from "./script/routes/routes.js";

const app = express();

admin.initializeApp({
    credential: admin.credential.cert("serviceAccountFirebase.json")
});

app.use('/compras', comprasRoutes);
 

app.listen(3001, ()=> console.log('API rest iniciada em http://localhost:3001'))

