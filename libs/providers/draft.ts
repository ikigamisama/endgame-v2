import { CharacterDraftPayloadProps } from "../helpers/types";

export function generateDraftSlot (mode: string, draftID: string, player1: string, player2: string) : CharacterDraftPayloadProps[]  {
    let length = 0,
        payloadDraft = [],
        initPayloadPlayer1Pick: CharacterDraftPayloadProps  = { draftID: '', index: '', playerID: '', status: '' },
        initPayloadPlayer1Ban: CharacterDraftPayloadProps = { draftID: '', index: '', playerID: '', status: '' },
        initPayloadPlayer2Pick: CharacterDraftPayloadProps = { draftID: '', index: '', playerID: '', status: '' },
        initPayloadPlayer2Ban: CharacterDraftPayloadProps = { draftID: '', index: '', playerID: '', status: '' };

    switch(mode){
        case "1v1": {
            length = 1;
            break;
        }
        case "2v2": {
            length = 2;
            break;
        }
        case "3v3": {
            length = 3;
            break;
        }
        case "4v4": {
            length = 4;
            break;
        }
    }
    
    for(let i = 0; i < length; i++){
        initPayloadPlayer1Pick = {draftID: draftID, playerID: player1, status: 'pick', index: `player-1-pick-${i + 1}`}
        initPayloadPlayer1Ban = {draftID: draftID, playerID: player1, status: 'ban', index: `player-1-ban-${i + 1}`}

        payloadDraft.push(initPayloadPlayer1Pick)
        payloadDraft.push(initPayloadPlayer1Ban)
    }

    for(let k = 0; k < length; k++){
        initPayloadPlayer2Pick = {draftID: draftID, playerID: player2, status: 'pick', index: `player-2-pick-${k + 1}`}
        initPayloadPlayer2Ban = {draftID: draftID, playerID: player2, status: 'ban', index: `player-2-ban-${k + 1}`}

        payloadDraft.push(initPayloadPlayer2Pick)
        payloadDraft.push(initPayloadPlayer2Ban)
    }

    return payloadDraft;
}