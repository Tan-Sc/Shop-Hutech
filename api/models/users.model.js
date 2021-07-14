const mongoose = require("mongoose");
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true //xoa khoang cach dau cuoi
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password"]
    },
    addresses: {
        type: Array,
        default: []
    },
    role: {
        type: Number,
        default: 0
    },
    cart: {
        type: Array,
        default: []
    },
    isBlock: {
        type: Boolean,
        default: false
    },
    resetLink:{
        data: String,
        default: ''
    }
    
}, {
    timestamps: true
})
module.exports = mongoose.model('Users', userSchema);