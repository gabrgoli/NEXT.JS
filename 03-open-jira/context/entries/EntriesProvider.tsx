import { FC, useReducer, useEffect } from 'react';
 import { v4 as uuidv4 } from 'uuid';
//import { uuid as uuidv4 } from 'uuidv4';
import {entriesApi} from '../../apis'
import { Entry } from '../../interfaces';

import { EntriesContext, entriesReducer } from './';

export interface EntriesState {
    entries: Entry[];
}


const Entries_INITIAL_STATE: EntriesState = {
     entries: [
    //     {
    //         _id: uuidv4(),
    //         description: 'Pendiente: Proident dolor duis elit sunt qui dolor laborum veniam ea laboris qui consequat.',
    //         status: 'pending',
    //         createdAt: Date.now(),
    //     },
    //     {
    //         _id: uuidv4(),
    //         description: 'En-Progreso Veniam in cupidatat adipisicing Lorem sunt est est ex cillum laboris fugiat officia fugiat.',
    //         status: 'in-progress',
    //         createdAt: Date.now() - 1000000,
    //     },
    //     {
    //         _id: uuidv4(),
    //         description: 'Terminadas: Commodo veniam aliqua tempor officia officia non laborum.',
    //         status: 'finished',
    //         createdAt: Date.now() - 100000,
    //     },
    // 
],
}

interface Props{
    children:React.ReactNode
}

export const EntriesProvider:FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer( entriesReducer , Entries_INITIAL_STATE );

    const addNewEntry = async( description: string ) => {
        //const addNewEntry=async (description:string)=>{
            const {data}=await entriesApi.post<Entry>('/entries',{description});
            dispatch({ type: '[Entry] Add-Entry', payload: data });
    }
        // const newEntry: Entry = {
        //     _id: uuidv4(),
        //     description,
        //     createdAt: Date.now(),
        //     status: 'pending'
        // }

        // dispatch({ type: '[Entry] Add-Entry', payload: newEntry });
   // }

    const updateEntry = async( {_id,description,status}: Entry ) => {

        try{
            const {data}= await entriesApi.put<Entry>(`/entries/${_id}`,{description: description, status:status})

            dispatch({ type: '[Entry] Entry-Updated', payload: data });

        }catch(error){
            console.log({error})
        }
    }


    const refreshEntries=async()=>{
        const {data}=await entriesApi.get<Entry[]>('/entries')
        console.log(data)
        //const resp=await entriesApi.get('/entries', { headers: { "Accept-Encoding": "gzip,deflate,compress" })
        dispatch({type:'[Entry] Refresh-Data',payload:data})
    }


    useEffect(() => {
      refreshEntries();
    }, []);
    


    return (
        <EntriesContext.Provider value={{
            ...state,

            // Methods
            addNewEntry,
            updateEntry,
        }}>
            { children }
        </EntriesContext.Provider>
    )
};