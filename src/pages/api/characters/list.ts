
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/prisma/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {

    if(req.method === "GET"){
        try{
            const characterList = await prisma.characters.findMany()
            res.status(200).json({ 
                success: true,
                list: characterList
            })
        }
        catch(error){
            res.status(403).json({ 
                success: false,
                error: "Error on fetch characters"
            })
        }
    }   
}
  