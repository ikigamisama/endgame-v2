
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/prisma/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {

    if(req.method === "POST"){
        try{
            let charactersQuery = null;
            if(req.body.page === "Settings"){
                charactersQuery = await prisma.characters.findMany({
                    orderBy: [
                        {
                          name: 'asc',
                        }
                    ]
                })
            }
            else{
                charactersQuery = await prisma.characters.findMany({
                    where:{
                        is_visible: true
                    },
                    orderBy: [
                        {
                          name: 'asc',
                        }
                    ]
                })
            }
            
            res.status(200).json({ 
                success: true,
                list: charactersQuery
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
  