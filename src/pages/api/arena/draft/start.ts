
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/prisma/client'
import { getServerSession } from 'next-auth'
import { authentication } from '@/src/pages/api/auth/[...nextauth]'
import { pusherServer } from '@/libs/providers/pusherServer'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {

    if(req.method === "POST"){
        const session = await getServerSession(req,res,authentication) 

        if(session){
            try{
                pusherServer.trigger('drafting', 'arena-player-route', {
                    arena_id: req.body.arenaID,
                    player1: req.body.player1,
                    player2: req.body.player2,
                })

                res.status(200).json({ 
                    success: true,
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
  