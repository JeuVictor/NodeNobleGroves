import express, {json} from "express";
import admin from 'firebase-admin';
import { catalogoRoutes, comprasRoutes } from "./script/routes/routes.js";

const app = express();
admin.initializeApp({
    credential: admin.credential.cert("serviceAccountFirebase.json")
});

app.use(json());


app.use((request, response, next) => {
    // TODO: allow only secure origins
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PATCH,DELETE");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  }) 

app.use('/compras.html', comprasRoutes);

app.use('/index.html', catalogoRoutes)
 

app.listen(3001, ()=> console.log('API rest iniciada em http://localhost:3001'))

