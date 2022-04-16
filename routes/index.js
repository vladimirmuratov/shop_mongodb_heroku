const express = require("express")
const router = express.Router({mergeParams: true})

router.use("/", require("./goods.routes"))
router.use("/auth", require("./auth.routes"))
router.use("/user", require("./user.routes"))
router.use("/order", require("./order.routers"))
router.use("/products", require("./products.routes"))

module.exports = router