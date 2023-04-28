import { create } from "zustand";
import { TimerFunction, TimerStoreState } from "../helpers/types";


const initialState: TimerStoreState = {
    timer: 0,
    isPauseTimer: true
}

export const timerStore = create<TimerStoreState & TimerFunction>((set, get) => ({ 
    ...initialState,
    setTimer: (time: number) => {
        set({timer: time})
    },
    setIsPause: (method: boolean) => {
        set({isPauseTimer: method})
    }
}))