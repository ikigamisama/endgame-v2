import { create } from 'zustand'
import { CharacterInfoProps, DraftFunctions, DraftStateProps } from '../helpers/types'


const initialState: DraftStateProps = {
    init: "",
    characters: [],
    mode: "3v3",
    characterFilterElement: "all",
    searchCharacter: '',
    applyCharacterModal: false,
    applyBossModal: false,
    isStartDraft: false,
    currentDraftPhase: "",
    currentPlayerDraft: "",
    currentAudioPlay: "",
    timer: 30,
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
    draft: {
        player1: [],
        player2: []
    }
    
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
    }   

}))