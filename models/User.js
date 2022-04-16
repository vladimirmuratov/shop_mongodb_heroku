const {Schema, model} = require("mongoose")

const schema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    image: {type: String},
    cart: {type: Schema.Types.ObjectId, ref: "Cart"}

}, {
    timestamps: true
})

module.exports = model("User", schema)