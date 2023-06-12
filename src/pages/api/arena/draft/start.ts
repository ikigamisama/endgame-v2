
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/prisma/client'
import { getServerSession } from 'next-auth'
import { authentication } from '@/src/pages/api/auth/[...nextauth]'
import { createSequence, generateDraftSlot } from '@/libs/providers/draft'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {

    if(req.method === "POST"){
        const session = await getServerSession(req,res,authentication) 

        if(session){
            try{
                let getSequenceList = createSequence(req.body.mode)
                const createDraft = await prisma.draft.create({
                    data:{
                        name: 'Endgame ' + req.body.arena_type + ' - ' + req.body.player1_name + ' vs ' + req.body.player2_name,
                        arenaID: req.body.arenaID,
                        bossID: req.body.boss_id,
                        player1_id: req.body.player1,
                        player2_id: req.body.player2,
                        sequence: getSequenceList
                    }
                })
                const updateArena = await prisma.arena.update({
                    where:{
                        uid: req.body.arenaID,
                    },
                    data:{
                        mode: req.body.mode
                    }
                })
                
                const createDraftData = await prisma.characterDraft.createMany({
                    data: generateDraftSlot(req.body.mode, createDraft.uid, req.body.player1, req.body.player2)
                })

               if(updateArena && createDraft && createDraftData){
                res.status(200).json({ 
                    success: true,
                    draft_id: createDraft.uid,
                    socket:{
                        function: req.body.function,
                        arena_id: req.body.arenaID,
                        draft_id: createDraft.uid,
                        player1: req.body.player1,
                        player2: req.body.player2,
                    }
                })
               }
               
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
  