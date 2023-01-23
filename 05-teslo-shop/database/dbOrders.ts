import { isValidObjectId } from 'mongoose';
import { db } from '.';
import { IOrder } from '../interfaces';
import { Order } from '../models';


export const getOrderById = async( id: string ):Promise<IOrder| null> => { // devuelve una promesa o null

    if ( !isValidObjectId(id) ){  // si es un id de mongo
        return null;
    }

    await db.connect();
    const order = await Order.findById( id ).lean();
    await db.disconnect();

    if ( !order ) { //si no hay una orden retrono null
        return null;
    }

    return JSON.parse(JSON.stringify(order));


}


export const getOrdersByUser = async( userId: string ): Promise<IOrder[]> => {
    
    if ( !isValidObjectId(userId) ){
        return [];
    }

    await db.connect();
    const orders = await Order.find({ user: userId }).lean();
    await db.disconnect();


    return JSON.parse(JSON.stringify(orders));


}