import { create } from 'zustand'
import { BossInfoProps, CharacterInfoProps, DraftFunctions, DraftInfoProps, DraftSequence, DraftStateProps, PlayerDraftInfo } from '../helpers/types'
import { arrangeDraftCharacterlistModal, createSequence, draftLayoutBan, draftLayoutPick, getBanWidth } from '../providers/draft'
import { mountStoreDevtool } from 'simple-zustand-devtools';

const initialState: DraftStateProps = {
    init: "",
    characters: [],
    characterFilterElement: "all",
    searchCharacter: '',
    applyCharacterModal: false,
    applyBossModal: false,
    isStartDraft: false,
    currentPlayerDraft: "",
    timer: 0,
    boss: {
        id: "",
        name: "",
        picture: "",
        picture_choose: "",
        picture_flash: "",
        is_visible: true
    },
    currentCharacterChoose: {
        id:'',
        name: '',
        display_name: '',
        rarity: '',
        vision: '',
        weapon: '',
        draft_picture: '',
        pick_picture: '',
        flash_picture: '',
        ban_picture: '',
        ban_audio:   '',
        pick_audio:  '',
        is_visible: true,
        nation: ''
    },
    finalCharacterChoose:{
        id:'',
        name: '',
        display_name: '',
        rarity: '',
        vision: '',
        weapon: '',
        draft_picture: '',
        pick_picture: '',
        flash_picture: '',
        ban_picture: '',
        ban_audio:   '',
        pick_audio:  '',
        is_visible: true,
        nation: ''
    },
    player1: {
        id: '',
        username: '',
        avatar: '',
    },
    player2: {
        id: '',
        username: '',
        avatar: '',
    },
    pick: [],
    ban: {player1: [], player2: []},
    pickListCharacterDraft: {player1: [], player2: []},
    banListCharacterDraft: {player1: [], player2: []},
    banWidthSize: 0,
    sequence: [],
    sequenceIndex: 0,
    currentSequence: {
        audio: '',
        player: '',
        index: ''
    },
    currentAudioPlay: "",
    currentCharacterFlash:"",
    currentBossFlash: "",
    player1_reroll: null,
    player2_reroll: null,
    draftSituation: '',
    isReroll: false
}

export const useDraftStore = create<DraftStateProps & DraftFunctions>((set, get) => ({ 
    ...initialState,
    
    setInit: (init: string) => {
        set({init: init})
    },
    setCharactersList: (characterList: CharacterInfoProps[]) => {
        set({characters: characterList})
    },
    setApplyCharacterModal: (modal: boolean) => {
        set({applyCharacterModal: modal})
    },
    setApplyBossModal: (modal: boolean) => {
        set({applyBossModal: modal})
    },
    setIsStartDraft: (start: boolean) => {
        set({isStartDraft: start})
    },
    setSearchCharacter: (char: string) => {
        set({searchCharacter: char})
    },
    searchCharacterList: (name: string, vision: string) => {
        let fillteredCharacters = [];
        fillteredCharacters = get().characters.filter(data => {
            if(name === '' && vision === "all"){
                return true;
            }
            else if(name !== '' && vision === 'all'){
                return data.name.toLowerCase().includes(name.toLowerCase());
            }
            else if(name === '' && vision !== 'all'){
                return data.vision.toLowerCase().includes(vision.toLowerCase());
            }
            else{
                return data.name.toLowerCase().includes(name.toLowerCase()) && data.vision.toLowerCase().includes(vision.toLowerCase()) 
            }
        })

        set({ characters: fillteredCharacters });
    },
    setCharacterFilterVision: (vision: string) => {
        set({characterFilterElement: vision})
    },
    setCurrentCharacterChoice: (characterInfo:  CharacterInfoProps) => {
        set({currentCharacterChoose: characterInfo})
    } ,
    setPlayer1Info: (player: PlayerDraftInfo ) => {
        set({ player1: player });
    },
    setPlayer2Info: (player: PlayerDraftInfo ) => {
        set({ player2: player });
    },
    setBossInfo: (bossInfo: BossInfoProps) => {
        set({ boss: bossInfo })
    },
    setPickList: (pickList: DraftInfoProps[], mode: string ) => {
        set({ pickListCharacterDraft: arrangeDraftCharacterlistModal(pickList)})
        set({ pick: draftLayoutPick(mode ,pickList) });
    },
    setBanList: (banList: DraftInfoProps[], mode: string ) => {
        set({ banListCharacterDraft: arrangeDraftCharacterlistModal(banList)})
        set({ banWidthSize: getBanWidth(mode) })
        set({ ban: draftLayoutBan(mode, banList) });
    },
    setTimer: (timer: number) => {
        set({ timer: timer })
    },
    setSequenceList: (mode: string) => {
        set({ sequence: createSequence(mode) })
    },
    setCurrentSequence: (currentSequence: DraftSequence) => {
        set({ currentSequence: currentSequence })
    },
    setCurrentAudioPlay: (audio: string) => {
        set({currentAudioPlay: audio})
    },
    setCurrentCharacterFlash: (img: string) => {
        set({currentCharacterFlash: img})
    },
    setCurrentBossFlash: (img: string) => {
        set({currentBossFlash: img})
    },
    setPlayer1Reroll: (roll: boolean | null) => {
        set({player1_reroll: roll})
    },
    setPlayer2Reroll: (roll: boolean | null) => {
        set({player2_reroll: roll})
    },
    setDraftSituation: (situation: string) => {
        set({ draftSituation: situation })
    },
    setIsReroll: (reroll: boolean) => {
        set({ isReroll: reroll })
    },
    setSequenceIndex: (index: number) => {
        set({sequenceIndex: index})
    }
}))

mountStoreDevtool('DraftStore', useDraftStore);
