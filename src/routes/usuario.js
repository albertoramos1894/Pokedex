const express = require('express');
const usuarioSchema = require('../models/usuario');
const request = require('request');

const router = express.Router();

//Create usuario
router.post('/usuario', (req,res) => {
    let usuario = usuarioSchema(req.body);
    let fecha = new Date();
    usuario.password = usuario.nick+fecha.getFullYear()+fecha.getHours()+fecha.getMinutes()+fecha.getSeconds();
    usuario.rolNombre = usuario.rol == 1 ? 'Maestro Pokemon' : 'Aprendiz';  
    request.get(`https://pokeapi.co/api/v2/pokemon/charmander`, (error,response,body) =>{
        if(error){
            return console.log(error);
        }
        console.log(body);
        usuario.pokemon = body;
    });  
    usuario.save()
    .then((data) => {
        res.json(data);        
    })
    .catch((error)=> res.json({ message: error }));
});

//get all usuarios
router.get('/usuarios', (req,res) => {
    usuarioSchema
    .find()
    .then((data) => res.json(data))
    .catch((error)=> res.json({ message: error }));
});

//get usuario
router.get('/usuario', (req,res) => {
    const { _id } = req.body;
    usuarioSchema
    .findById({ _id })
    .then((data) => res.json(data))
    .catch((error)=> res.json({ message: error }));
});

//login
router.post('/Login', (req,res) => {
    const { nick, password } = req.body;
    usuarioSchema
    .find({ nick, password })
    .then((data) =>{ 
        if(data.length>0){
        res.json({ Login: true,Error: false, message: "Login exitoso", Usuario :data[0]})
    }else{
        res.json({ Login: false,Error: false, message: "No se encontro usuarios con las credenciales ingresadas"})
    }
    })
    .catch((error)=> res.json({ message: error }));
});

//put usuario recibe el id del usuario que intenta actualizar para ver si tiene permisos
router.put('/usuario/:id', (req,res) => {
    const { id } = req.params;
    const { _id,nick, nombre, edad, region, rol } = req.body; 
    usuarioSchema
    .findById( { _id:id })
    .then((data) => {                 
        if(data.rol === 1){            
            let rolNombre = rol == 1 ? 'Maestro Pokemon' : 'Aprendiz';            
            usuarioSchema
            .updateOne( { _id }, { $set: {nick, nombre, edad, region, rol, rolNombre}} )
            .then((data) => res.json(data))
            .catch((error)=> res.json({ message: error }));
        }else{
            res.json({ message: 'Necesita ser un maestro pokemon para hacer esto.'});
        } 
    })
    .catch((error)=> res.json({ message: error }));
});

router.delete('/usuario/:id', (req,res) => {
    const { id } = req.params;
    const { _id } = req.body; 
    usuarioSchema
    .findById( { _id:id })
    .then((data) => {                 
        if(data.rol === 1){                                 
            usuarioSchema
            .deleteOne( { _id })
            .then((data) => res.json(data))
            .catch((error)=> res.json({ message: error }));
        }else{
            res.json({ message: 'Necesita ser un maestro pokemon para hacer esto.'});
        } 
    })
    .catch((error)=> res.json({ message: error }));
});




module.exports = router;