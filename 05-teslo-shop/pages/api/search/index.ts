//este archivo es para cuaNDO NO SE PONE NADA EN EL QUERY PARA SEARCXH


import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    res.status(400).json({ message: 'Debe de especificar el query de búsqueda' })
}