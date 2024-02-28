import { Product } from "./productTypes";

export interface IProductState {
    isModelOpen: boolean,
    products: Array<Product>,
    dataToDelete: Product | null
}