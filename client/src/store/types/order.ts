export type TOrderState = {
    orders: Array<TOrder> | null;
    isLoading: boolean;
    hasError: boolean;
    message: string;
}

export type TCart = {
    id: string;
    count: number;
}

export type TOrder = {
    _id?: string;
    createdAt?: string;
    userId: string;
    order: Array<TCart>;
    completed: boolean;
}