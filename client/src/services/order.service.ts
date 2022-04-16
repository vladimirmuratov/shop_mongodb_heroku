import httpService from "./http.service";
import {TOrder} from "../store/types/order";

const orderEndPoint = "/order/"

export const orderService = {
    fetch: async () => {
        try {
            const {data} = await httpService.get(orderEndPoint)
            return data
        }catch (error) {
            const errorObject = "Что-то пошло не так. Попробуйте позже"
            throw errorObject
        }
    },
    create: async (payload: TOrder) => {
        try {
            const {data} = await httpService.post(orderEndPoint, payload)
            return data
        }catch (error) {
            const errorObject = "Что-то пошло не так. Попробуйте позже"
            throw errorObject
        }
    },
    update: async (orderId: "" | string | undefined, payload: any) => {
        try {
            const {data} = await httpService.patch(orderEndPoint + orderId, payload)
            return data
        }catch (error) {
            const errorObject = "Что-то пошло не так. Попробуйте позже"
            throw errorObject
        }
    },
    remove: async (orderId: string | undefined) => {
        try {
            const {data} = await httpService.delete(orderEndPoint + orderId)
            return data
        }catch (error) {
            const errorObject = "Что-то пошло не так. Попробуйте позже"
            throw errorObject
        }
    }
}