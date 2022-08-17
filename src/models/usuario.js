const mongoose = require('mongoose');

const userShema = mongoose.Schema({
    nick:{
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    rol: {
        type: Number,
        require:true
    },
    password: {
        type: String,
        require:false
    },
    rolNombre: {
        type:String,
        required: false
    },
    pokemon:{
        type:String,
        required: false
    }
});

module.exports = mongoose.model('usuario',userShema);