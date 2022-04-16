const express = require("express")
const Goods = require("../models/Goods")

const router = express.Router({mergeParams: true})

router.get("/:type/:id", async (req, res) => {
    try {
        const {id} = req.params
        const currentItem = await Goods.findById(id).exec()
        res.status(200).send(currentItem)
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже"
        })
    }
})

router.patch("/:id", async (req, res) => {
    const {id} = req.params
    try {
        const updatedItem = await Goods.findByIdAndUpdate(id, req.body, {returnDocument: 'after'})
        res.status(200).send(updatedItem)
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже"
        })
    }
})

router.post("/", async (req, res) => {
    const {type, price, name, manufacturer, inStock, image} = req.body
    try {
        const newProduct = await Goods.create({type, price, name, manufacturer, inStock, image})
        console.log(newProduct)
        res.status(201).send(newProduct)
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже"
        })
    }
})

router.delete("/:id", async (req, res) => {
    const {id} = req.params
    try {
        const removedItem = await Goods.findByIdAndRemove(id)
        res.status(200).send(removedItem)
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже"
        })
    }
})

module.exports = router