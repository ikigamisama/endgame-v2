import { create } from 'zustand'
import { DraftFunctions, DraftStateProps } from '../helpers/types'


const initialState: DraftStateProps = {
    init: ""
}



export const useArenaStore = create<DraftStateProps & DraftFunctions>((set, get) => ({ 
    ...initialState,
    
    setInit: (init: string) => {
        set({init: init})
    },

}))