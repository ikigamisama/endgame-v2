
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/prisma/client'
import { authentication } from '../../auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { pusherServer } from '@/libs/providers/pusherServer'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {

    if(req.method === "POST"){
        const session = await getServerSession(req,res,authentication) 
        try{
            const findUserArenaPlayer = await prisma.arenaPlayer.findFirst({
                where:{
                    user_id: session?.user?.id,
                    arena_id: req.body.arenaID,
                }
            }) 
            await prisma.arenaPlayer.update({
                where: {
                    id: findUserArenaPlayer?.id
                },
                data:{
                    isActive: false
                }
            })

            pusherServer.trigger('arena-room', 'remove-arena-players', {
                arenaID: req.body.arenaID, 
                arenaPlayerID: findUserArenaPlayer?.id 
            })
            res.status(200).json({ 
                success: true,
                message:`Log Out`
            }) 
        }
        catch(error){
            res.status(200).json({ 
                success: false,
                message:error,
            })
        }
    }
        
}
  