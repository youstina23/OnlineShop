import { Product } from "./Product";

export interface Cart{
    id?: number;
    username : string;
    products: Product[];
}