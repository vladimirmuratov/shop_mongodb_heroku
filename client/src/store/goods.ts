import {createSlice} from "@reduxjs/toolkit";
import {goodsService} from "../services/goods.service";
import {TDataState} from "./types/goods";
import {TProduct} from "../types";
import {localStorageService} from "../services/localStorage.service";

const initialState: TDataState = {
    data: [],
    cart: [],
    hasError: false,
    message: "",
    isLoading: false,
}

const goodsSlice = createSlice({
    name: "goods",
    initialState,
    reducers: {
        requested(state) {
            state.isLoading = true
        },
        received(state, action) {
            state.data = action.payload
            state.isLoading = false
            state.hasError = false
            state.message = ""
        },
        fetchCartFromLocStorage(state, action) {
            state.cart = action.payload
        },
        failed(state, action) {
            state.isLoading = false
            state.hasError = true
            state.message = action.payload
        },
        addedToCart(state, action) {
            state.cart = [...state.cart, action.payload]
            state.isLoading = false
            state.hasError = false
            state.message = ""
        },
        removedFromCart(state, action) {
            state.cart = state.cart.filter(item => item.id !== action.payload)
        },
        removedFromTable(state, action) {
            state.data = state.data.filter(item => item._id !== action.payload)
            state.isLoading = false
            state.hasError = false
            state.message = ""
        },
        clearedCart(state) {
            state.cart = []
        },
        updatedInStock(state) {
            state.isLoading = false
        }
    }
})

const {actions, reducer: goodsReducer} = goodsSlice
const {
    received,
    requested,
    fetchCartFromLocStorage,
    failed,
    addedToCart,
    removedFromCart,
    removedFromTable,
    clearedCart,
    updatedInStock
} = actions

export const loadGoods = () => async (dispatch) => {
    dispatch(requested())
    try {
        const {data} = await goodsService.fetch()
        // const sortedContent = _.sortBy(content, ["type"], ["asc"])
        dispatch(received(data.content))
        const cart = localStorageService.getCart()
        if (cart?.length) {
            dispatch(fetchCartFromLocStorage(JSON.parse(cart)))
        }

    } catch (error) {
        dispatch(failed(error))
    }
}

export const addProdToCart = (payload: { id: string; count: number; }) => {
    return addedToCart(payload)
}

export const removeFromCart = (id: string) => {
    return removedFromCart(id)
}

export const removeFromTable = (id: string) => async (dispatch: any) => {
    dispatch(requested())
    try {
        const {content} = await goodsService.remove(id)
        if (content) {
            dispatch(removedFromTable(id))
        }
    } catch (error) {
        dispatch(failed(error))
    }
}

export const update = (payload: TProduct) => async (dispatch: any) => {
    dispatch(requested())
    try {
        await goodsService.update(payload)
    } catch (error) {
        dispatch(failed(error))
    }
}

export const create = (payload: TProduct) => async (dispatch: any) => {
    dispatch(requested())
    try {
        await goodsService.create(payload)
    } catch (error) {
        dispatch(failed(error))
    }
}

export const clearCart = () => {
    return clearedCart()
}

export const updateInStock = (itemId: string, payload: number) => async (dispatch: any) => {
    dispatch(requested())
    try {
        await goodsService.updateInStock(itemId, payload)
        await dispatch(updatedInStock())
        await dispatch(loadGoods())
    } catch (error) {
        dispatch(failed(error))
    }
}

export default goodsReducer