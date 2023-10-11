const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('O codigo está rodando corretamente');
});
app.get('/greeting',(req, res) =>{
    const name = req.query.name;
    res.send (`Olá ${name}`);
    });
    app.get('/factorial', (req, res) =>{
        const numero = req.query.numero;
        let factorial =1
        if (numero == 0)
            res.send(`${numero}! = ${numero}`)
        else{
            for (let i = numero; i >=1; i-- ){
                factorial *=i;
            }
            res.send(`${numero}! = ${factorial}`);
        }
    });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});