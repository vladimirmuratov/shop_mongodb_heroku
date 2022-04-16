import {combineReducers} from "redux";
import goodsReducer from "./goods";
import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./user";
import orderReducer from "./order";

const rootReducer = combineReducers({
    data: goodsReducer,
    user: userReducer,
    order: orderReducer
})

export type RootState = ReturnType<typeof rootReducer>

function createStore() {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware(),
        devTools: process.env.NODE_ENV !== "production",
    });
}

export default createStore;