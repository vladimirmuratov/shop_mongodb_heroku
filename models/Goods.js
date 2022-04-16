const {Schema, model} = require("mongoose")

const schema = new Schema({
    type: {
        type: String,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    inStock: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = model("Goods", schema)