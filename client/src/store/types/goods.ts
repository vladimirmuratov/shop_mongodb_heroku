import {TProduct} from "../../types";
import {TCart} from "./order";


export type TDataState = {
    data: Array<TProduct>;
    cart: Array<TCart>;
    hasError: boolean;
    message: {};
    isLoading: boolean;
}