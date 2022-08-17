require('dotenv').config();
const userRoutes = require('./routes/usuario');
const express = require('express');
const mongoose = require('mongoose');
const request = require('request');
const port = process.env.PORT;
const mongoUri = process.env.MONGODB_URI;
const app = express();
let usuario = {};

app.listen(port, () => console.log('Server activado en el puerto',port));

app.use(express.json());
app.use('/api',userRoutes);

app.get('/', (req,res) =>{
    res.sendFile(renderHtml);
});

mongoose.connect(mongoUri)
.then(() => console.log('Conexión exitosa a MongoDB'))
.then(request.get(`http://127.0.0.1:${ port }/api/usuarios`, (error,response,body) =>{
    if(error){
        return console.log(error);
    }
    if(Object.keys(body).length === 2){
        console.log('Vamos a crear al primer usuario');
        var options = {
            'method': 'POST',
            'url': `http://127.0.0.1:${ port }/api/usuario`,
            'headers': {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "nick": "ash",
              "nombre": "Satoshi",
              "edad": 11,
              "region": "kanto",
              "rol": 1            
            })
          
          };
          request(options, function (error, response) {
            if (error) throw new Error(error);
            console.log(response.body);
          });
    }            
}))
.catch((error) => console.log(error));