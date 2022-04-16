const express = require("express")
const User = require("../models/User")

const router = express.Router({mergeParams: true})

router.get("/:userId", async (req, res) => {
    try{
        const {userId} = req.params
        if(userId){
            const data = await User.findById(userId)
            res.status(200).send(data)
        }
    }catch (e) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже'
        })
    }
})

module.exports = router
