const mongoose = require('../database');

const VaccineSchema = new mongoose.Schema({

    name: {
        type: String,
        uppercase: true,
        required: true,
    },

    lotNumber: {
        type: Number,
        required: true
    },
    quantity:{
        type:Number,
        required: true
    },

    input: {
        type: Number,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

});

const Vaccine = mongoose.model('Vaccine', VaccineSchema);

module.exports = Vaccine;