
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/prisma/client'
import { getServerSession } from 'next-auth'
import { authentication } from '@/src/pages/api/auth/[...nextauth]'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {

    if(req.method === "POST"){
        const limit = 5;
            const records = await prisma.draft.findMany({
                where: {
                    isFinish: true
                },
                select:{
                    user: {
                        select: {
                            avatar: true,
                            username: true
                        }
                    },
                    arena: {
                        select: {
                            name: true
                        }
                    },
                    boss: {
                        select: {
                            picture: true
                        }
                    },
                    CharacterDraft:{
                        select: {
                            character: {
                                select: {
                                    draft_picture: true
                                }
                            },
                            index: true,

                        },
                    },
                    player1: {
                        select: {
                            avatar: true,
                            username: true
                        }
                    },
                    player2: {
                        select: {
                            avatar: true,
                            username: true
                        }
                    }
                },
                orderBy:{
                    createdAt: 'desc'
                }
            })
            const listArenaName = await prisma.arena.findMany({
                select: {
                    name: true
                },
                orderBy: {
                    name: 'desc'
                }
            })
            const totalRecords = records.length;
            const totalPages = Math.ceil(totalRecords / limit);

            const paginationNumbers = [];
            for (let i = 1; i <= totalPages; i++) {
                paginationNumbers.push(i);
            }

            const startIndex = (req.body.page - 1) * limit;
            const endIndex = req.body.page * limit;
            const currentRecords = records.slice(startIndex, endIndex);

            listArenaName.push({name: 'All'})
            
            res.status(200).json({ 
                success: true,
                records: currentRecords,
                arenaList: listArenaName,
                totalRecords: totalRecords,
                currentNumber: req.body.page,
                paginationNumbers: paginationNumbers
            })
    }   
}
  