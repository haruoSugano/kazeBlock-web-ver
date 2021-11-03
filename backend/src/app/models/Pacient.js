const mongoose = require('mongoose');

const PacientSchema = new mongoose.Schema({
    
    name: {
        type: String,
        uppercase: true,
        required: true,
    },

    age: {
        type: Number,
        required: true,
        min: 0,
        max: 150,
    },

    cpf: {
        type: Number,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    tel: {
        type: String,
        required: true,
    },

    vaccine:{
        type: String,
        default: null
    },

    vaccinated:{
        type: Boolean,
        default: false
    },

    vaccinationDate:{
        type: Date,
        default: null
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

const Pacient = mongoose.model('Pacient', PacientSchema);

module.exports = Pacient;