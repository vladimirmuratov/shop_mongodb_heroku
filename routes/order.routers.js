const express = require("express")
const Order = require("../models/Order")
const auth = require("../middleware/auth.middleware")

const router = express.Router({mergeParams: true})

router.get("/", auth, async (req, res) => {

    try {
        const list = await Order.find()
        res.status(200).send(list)
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже"
        })
    }
})

router.post("/", auth, async (req, res) => {

    try {
        const newOrder = await Order.create({
            ...req.body
        })
        await newOrder.save()
        res.status(201).send(newOrder)
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже..."
        })
    }
})

router.patch("/:orderId", async (req, res) => {
    try {
        const {orderId} = req.params
        const completedStatus = await Order.findByIdAndUpdate(orderId, req.body, {returnDocument: 'after'})
        res.status(200).send(completedStatus)
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже..."
        })
    }
})

router.delete("/:orderId", async (req, res) => {
    try {
        const {orderId} = req.params
        await Order.findByIdAndDelete(orderId)
        res.status(200).send(null)
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже..."
        })
    }
})

module.exports = router