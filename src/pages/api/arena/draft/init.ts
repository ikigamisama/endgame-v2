
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
                switch(req.body.type){
                    case "character_draft": {
                        const findCharacterDraft = await prisma.characterDraft.findFirst({
                            where: {
                                draftID: req.body.draft_id,
                                index: req.body.sequence.index
                            }
                        })

                        const findCurrentDraft = await prisma.draft.findFirst({
                            where: {uid: req.body.draft_id}
                        })
                        
                        if(findCharacterDraft && findCurrentDraft){
                            let getSequenceDraft = JSON.parse(findCurrentDraft.sequence);
                            if(req.body.characterID !== ""){
                                await prisma.characterDraft.update({
                                    where: {
                                        uid: findCharacterDraft.uid
                                    },
                                    data:{
                                        characterID: req.body.characterID
                                    }
                                })
                            }
                           
                            await prisma.draft.update({
                                where: {uid: req.body.draft_id},
                                data: {current_status_draft: req.body.sequence.index}
                            })

                            if((getSequenceDraft.length + 1)  !== req.body.sequenceIndex){
                                pusherServer.trigger("drafting", req.body.function, {
                                    draft_id: req.body.draft_id,
                                    sequence: getSequenceDraft.length !== req.body.sequenceIndex ? getSequenceDraft[req.body.sequenceIndex] : null,
                                    sequenceIndex: req.body.sequenceIndex,
                                    isStartingDraft: req.body.isStartingDraft,
                                    characterID: req.body.isStartingDraft === true ? null : req.body.characterID,
                                });
                            }
                            else{
                                pusherServer.trigger("drafting", req.body.function, {
                                    draft_id: req.body.draft_id,
                                    sequence: null,
                                    sequenceIndex: null,
                                    isStartingDraft: null,
                                    characterID: null,
                                });
                            }
        
                           
                        }
                        break;
                    }
                    case "boss_init": {
                        const bossList = await prisma.boss.findMany({
                            orderBy: [
                                {
                                  name: 'asc',
                                }
                            ]
                        });
                        let bossIndex = Math.floor(Math.random() * (bossList.length - 0 + 1)) + 0;
                        await prisma.draft.update({
                            where: {
                                uid: req.body.draft_id
                            },
                            data:{
                                current_status_draft: 'init',
                                bossID: bossList[bossIndex].id
                            }
                        })
                       
                        pusherServer.trigger("drafting", req.body.function, {
                            draft_id: req.body.draft_id,
                            boss: bossList[bossIndex],
                            isReroll: req.body.isReroll
                        });
                        break;
                    }
                    case "reroll_decisions": {
                        let payload = {};
                        if(req.body.playerPosition === "player1"){
                            payload = {player1_reroll: req.body.playerReroll}
                        }
                        else{
                            payload = {player2_reroll: req.body.playerReroll}
                        }
                        await prisma.draft.update({
                            where: {
                                uid: req.body.draft_id
                            },
                            data: payload
                        })
    
                        pusherServer.trigger("drafting", req.body.function, {
                            draft_id: req.body.draft_id,
                            player_position: req.body.playerPosition,
                            playerReroll: req.body.playerReroll
                        });
    
                        break;
                    }
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
  