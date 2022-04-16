import {TOrder, TOrderState} from "./types/order";
import {createAction, createSlice} from "@reduxjs/toolkit";
import {orderService} from "../services/order.service";

const initialState: TOrderState = {
    orders: null,
    hasError: false,
    message: "",
    isLoading: false
}

const removed = createAction("order/removed")

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        requested(state) {
            state.isLoading = true
        },
        received(state, action) {
            state.orders = action.payload
            state.isLoading = false
            state.message = ""
            state.hasError = false
        },
        failed(state, action) {
            state.isLoading = false
            state.hasError = true
            state.message = action.payload
        }
    }
})

const {actions, reducer: orderReducer} = orderSlice
const {requested, received, failed} = actions

export const fetchOrders = () => async (dispatch: any) => {
    dispatch(requested())
    try {
        const {content} = await orderService.fetch()
        dispatch(received(content))
    } catch (error) {
        dispatch(failed(error))
    }
}

export const createOrder = (payload: TOrder) => async (dispatch: any) => {
    dispatch(requested())
    try {
        if (payload) {
            await orderService.create(payload)
            await dispatch(fetchOrders())
        }

    } catch (error) {
        dispatch(failed(error))
    }
}

export const completeOrder = (orderId: "" | string | undefined) => async (dispatch: any) => {
    dispatch(requested())
    try {
        await orderService.update(orderId, {completed: true})
        dispatch(fetchOrders())
    } catch (error) {
        dispatch(failed(error))
    }
}

export const removeOrder = (orderId: string | undefined) => async (dispatch: any) => {
    dispatch(requested())
    try {
        const {content} = await orderService.remove(orderId)
        if (content === "") {
            dispatch(fetchOrders())
        }
        dispatch(removed())
    } catch (error) {
        dispatch(failed(error))
    }
}

export default orderReducer