const mongoose = require('mongoose');

const historicoShema = mongoose.Schema({    
    fecha: {
        type: Date,
        required: false
    },
    tipoMovimiento: {
        type: String,
        required: false
    },
    coleccionAfectada: {
        type: String,
        required: false
    },
    idAlterado: {
        type: String,
        required: false
    }

});

module.exports = mongoose.model('historico',historicoShema);