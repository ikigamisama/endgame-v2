
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/prisma/client'
import { getServerSession } from 'next-auth'
import { authentication } from '@/src/pages/api/auth/[...nextauth]'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {

    const session = await getServerSession(req,res,authentication) 

    if(req.method === "POST"){
        try{
            const createArena = await prisma.arena.create({
                data:{
                    host_id: session?.user?.id,
                    type: req.body.game_type
                }
            }) 

            res.status(200).json({ 
                success: true,
                arena: createArena,
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
  