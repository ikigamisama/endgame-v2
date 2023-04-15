
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/prisma/client'
import { getServerSession } from 'next-auth'
import { authentication } from '@/src/pages/api/auth/[...nextauth]'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {

    if(req.method === "POST"){
        const session = await getServerSession(req,res,authentication) 

        if(session){
            let wherePayload = {}
                if(req.body.role === "GM"){
                    wherePayload = {
                        arena_id: req.body.arenaID,
                        isActive: true, 
                        isChoose: false
                    }
                }
                else{
                    wherePayload = {
                        arena_id: req.body.arenaID,
                        isActive: true, 
                    }
                }
    
                const getArenaPlayers = await prisma.arenaPlayer.findMany({
                    where: wherePayload,
                    include:{
                        user: true
                    }
                })  
                res.status(200).json({ 
                    success: true,
                    list: getArenaPlayers,
                })
            try{
                
               
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
  