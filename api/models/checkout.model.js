const mongoose = require('mongoose')

const checkoutSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    address: {
        type: Object,
        require: true
    },
    cart: {
        type: Array,
        default: []
    },
    status: {
        type: Boolean,
        default: false
    },
    total: {
        type: Number,
        default: 0
    },
    payments: {
        type: String,
        default: "Payment at home"
    },
    tax: {
        type: Number,
        default: 0
    },
    deliveryCharges: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Checkout', checkoutSchema);