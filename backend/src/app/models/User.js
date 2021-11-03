const mongoose = require('../database');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        uppercase: true,
        required: true,
    },

    cpf: {
        type: Number,
        required: true,
    },

    type: {
        type: Number,
        default: 1
    },

    email: {
        type:String,
        unique: true,
        required: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: true,
        select: false
    },   

    passwordResetToken:{
        type: String,
        select: false
    },

    passwordResetExpires: {
        type: Date,
        select: false
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', async function (next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

UserSchema.pre('findOneAndUpdate', function (next) {
    let password = this.getUpdate().password + '';
    if(password.length < 55) {
        this.getUpdate().password = bcrypt.hashSync(password, 10);
    }
    next();
})

const User = mongoose.model('User', UserSchema);

module.exports = User;