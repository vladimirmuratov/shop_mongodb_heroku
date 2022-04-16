const goodsMock = require("../mock/goods.json")
const Goods = require("../models/Goods")

async function createInitEntity(Model, data) {
    await Model.collection.drop()
    return Promise.all(
        data.map(async (item) => {
            try {
                delete item.id
                const newItem = new Model(item)
                await newItem.save()
                return newItem
            } catch (e) {
                return e
            }
        })
    )
}

module.exports = async () => {
    const goods = Goods.find()
    if (goods.length !== goodsMock.length) {
        await createInitEntity(Goods, goodsMock)
    }
}