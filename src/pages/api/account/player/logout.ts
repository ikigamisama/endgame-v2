
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/prisma/client'
import { authentication } from '../../auth/[...nextauth]'
import { getServerSession } from 'next-auth'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {

    if(req.method === "POST"){
        const session = await getServerSession(req,res,authentication) 
        try{
            await prisma.arenaPlayer.update({
                where: {
                    user_id: session?.user?.id,
                },
                data:{
                    isActive: false
                }
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
  