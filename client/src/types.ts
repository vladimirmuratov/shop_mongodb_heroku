export type TGoods = {
    _id: string;
    type: string;
    name: string;
}

export type TProduct = {
    _id: string;
    type: string;
    manufacturer: string;
    name: string;
    price: number;
    image: string;
    inStock: number;
    count?: number;
}