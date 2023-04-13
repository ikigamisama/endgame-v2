import { create } from 'zustand'
import { BossInfoProps, CharacterInfoProps, ProfileChanges, SettingActions, SettingState } from '../helpers/types'

const initialState: SettingState = {
    isGeneratePassword: false,
    userList:  [],
    bossList: [],
    characterList: [],
    searchUser: '',
    userInfo: {
        id: "",
        username: "",
        role: "",
        avatar: "" 
    },
    bossInfo: {
        id: '' ,
        name: '' ,
        picture: '' ,
        picture_choose: '' ,
        picture_flash: '' ,
        is_visible:  '' ,
    }

}

export const useSettingsStore = create<SettingState & SettingActions>((set, get) => ({ 
    ...initialState,
    applyGeneratePassword: (isGonnaGeneratePassword: boolean) => {
        set({ isGeneratePassword: isGonnaGeneratePassword})
    },
    setUserList: (users: ProfileChanges[]) => {
        set({ userList: users });
    },
    setUserInfo: (user: ProfileChanges) => {
        set({ userInfo: user });
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
    },
    setBossList: (bosses: BossInfoProps[]) => {
        set({ bossList: bosses });
    },
    setBossInfo: (boss: BossInfoProps) => {
        set({ bossInfo: boss });
    },
    setCharacterList: (characters: CharacterInfoProps[]) => {
        set({ characterList: characters });
    }
}))

