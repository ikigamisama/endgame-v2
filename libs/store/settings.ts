import { create } from 'zustand'
import { ProfileChanges, SettingActions, SettingState } from '../helpers/types'


const initialState: SettingState = {
    isGeneratePassword: false,
    userList:  [],
    searchUser: '',
}

export const useSettingsStore = create<SettingState & SettingActions>((set, get) => ({ 
    ...initialState,
    applyGeneratePassword: (isGonnaGeneratePassword: boolean) => {
        set({ isGeneratePassword: isGonnaGeneratePassword})
    },
    setUserList: (users: ProfileChanges[]) => {
        set({ userList: users });
    },
    setSearchUser: (search: string) => {
        set({ searchUser: search });
    },
    searchUserList: (name: string) => {
        let fillteredUsers = [];
        fillteredUsers = get().userList.filter(user => {
            if(name == ''){
                return true;
            }
            else{
                return user.username.toLowerCase().includes(name.toLowerCase());
            }
        })

        set({ userList: fillteredUsers });
    }
}))

