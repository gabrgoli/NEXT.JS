const fetcher = (...args: [key:string]) => fetch(...args).then(res => res.json());
import useSWR, { SWRConfiguration } from "swr"
import { IProduct } from "../interfaces";

export const useProducts=(url: string, config?: SWRConfiguration)=>{
    //const {data,error}=useSWR(`/api${url}`,fetcher,config);
    const {data,error}=useSWR <IProduct[]>(`/api${url}`,config);


    return{
        products: data ||[],
        isLoading: !error && !data,
        isError: error
    }


}