
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/prisma/client'
import { getServerSession } from 'next-auth'
import { authentication } from '@/src/pages/api/auth/[...nextauth]'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {

    if(req.method === "PUT"){
        const session = await getServerSession(req,res,authentication) 
       if(session){
        try{
            const updateArenaPlayers = await prisma.arenaPlayer.update({
                where: {
                    id: req.body.id
                },
                data:{
                    isChoose: req.body.isChoose
                }
            })  
            res.status(200).json({ 
                success: true,
                result: updateArenaPlayers,
            })
           
        }
        catch(err) {
            res.status(200).json({ 
                success: false,
                message: err,
            })
        }
       }
    }   
}
  