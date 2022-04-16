const {Schema, model} = require("mongoose")

const schema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: "User", required: true},
    order: {
        type: Array,
        id: {type: Schema.Types.ObjectId, ref: "Goods"},
        count: {type: Number}
        },
    completed: {type: Boolean, required: true}
}, {
    timestamps: true
})

module.exports = model("Order", schema)