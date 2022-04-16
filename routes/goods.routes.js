const express = require("express")
const router = express.Router({mergeParams: true})
const Goods = require("../models/Goods")

router.get("/", async (req, res) => {
    try {
        const list = await Goods.find()
        if(!list.length){
            res.status(404).json({message: "NOT_FOUND"})
        }
        res.status(200).send(list)
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже"
        })
    }
})

module.exports = router