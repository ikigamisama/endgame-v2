import { create } from 'zustand'
import { ArenaPlayerFunction, ArenaPlayers, ArenaPlayersPayloadFeature, ArenaPlayersState, PlayerProps } from '../helpers/types'


const initialState: ArenaPlayersState = {
    arenaPlayers: [],
    playerInfo: {
        id:"",
        name: "",
        avatar: ""
    },
    player1: {
        id:"",
        name: "",
        avatar: ""
    },
    player2: {
        id:"",
        name: "",
        avatar: ""
    },
    modal: false,
    modal_title: "",
    player_function_type: {
        player: "player1",
        type: 'insert'
    }
}


export const useArenaStore = create<ArenaPlayersState & ArenaPlayerFunction>((set, get) => ({ 
    ...initialState,
    
    setArenaPlayersList: (arenaPlayersList: ArenaPlayers[]) => {
        set({arenaPlayers: arenaPlayersList})
    },
    setModal: (modal: boolean) => {
        set({modal: modal})
    },
    setPlayer1: (player: PlayerProps) =>{
        set({player1: player})
    },
    setPlayer2: (player: PlayerProps) =>{
        set({player2: player})
    },
    setPlayerInfo: (player: PlayerProps) =>{
        set({playerInfo: player})
    },
    setModalTitle: (title: string) => {
        set({modal_title: title})
    },
    setPlayerFunctionType: (data: ArenaPlayersPayloadFeature) => {
        set({player_function_type: data})
    }
}))