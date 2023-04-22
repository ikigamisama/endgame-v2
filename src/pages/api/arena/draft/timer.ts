
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
                await prisma.draft.update({
                    where: { uid: req.body.draft_id },
                    data: { timer: req.body.timer },
                });
                if(req.body.isContinuingCooldown === false){
                    pusherServer.trigger("draft_timer", "update", {draft_id: req.body.draft_id, timer: req.body.timer,isPauseTimer: req.body.isPauseTimer });
                }
                
                res.status(200).json({ 
                    success: true
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
  