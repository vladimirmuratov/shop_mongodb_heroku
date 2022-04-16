import httpService from "./http.service";
import {TProduct} from "../types";

const goodsEndPoint = "/"
const productsEndPoint = "/products/"

export const goodsService = {
    fetch: async () => {
        try {
            return await httpService.get(goodsEndPoint)
        } catch (error) {
            const errorObject = "Что-то пошло не так. Попробуйте позже"
            throw errorObject
        }
    },
    remove: async (id: string) => {
        try {
            const {data} = await httpService.delete(productsEndPoint + id)
            return data
        } catch (error) {
            const errorObject = "Что-то пошло не так. Попробуйте позже"
            throw errorObject
        }
    },
    update: async (payload: TProduct) => {
        const {data} = await httpService.patch(productsEndPoint + payload._id, payload)
        return data
    },
    updateInStock: async (itemId: string, payload: number) => {
        const {data} = await httpService.patch(productsEndPoint + itemId, {inStock: payload})
        return data
    },
    create: async (payload: TProduct) => {
        try {
            const {data} = await httpService.post(productsEndPoint, payload)
            return data
        } catch (error) {
            const errorObject = "Что-то пошло не так. Попробуйте позже"
            throw errorObject
        }
    }
}