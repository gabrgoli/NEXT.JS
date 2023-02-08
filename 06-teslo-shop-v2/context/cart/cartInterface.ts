import { ISize } from '../../interfaces/products';

export interface ICartProduct {
    _id: string;
    description: string;
    image: string;
    inStock: number;
    price: number;
    size?: ISize;
    slug: string;
    title: string;
    gender: 'men'|'women'|'kid'|'unisex';
    quantity: number;
}