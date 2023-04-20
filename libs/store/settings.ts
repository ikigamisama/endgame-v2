import { create } from 'zustand'
import { BossInfoProps, CharacterInfoProps, ProfileChanges, SettingActions, SettingState } from '../helpers/types'

const initialState: SettingState = {
    isGeneratePassword: false,
    userList:  [],
    bossList: [],
    characterList: [],
    searchUser: '',
    searchCharacter: '',
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
        is_visible: true ,
    },
    characterInfo: {
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
    },

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
    setSearchCharacter: (search: string) => {
        set({ searchCharacter: search });
    },
    searchUserList: (name: string) => {
        let fillteredUsers = [];
        fillteredUsers = get().userList.filter(user => {
            if(name == ''){
                return true;
            }
            else{
                return user.username?.toLowerCase().includes(name.toLowerCase());
            }
        })

        set({ userList: fillteredUsers });
    },
    searchCharacterList: (name: string) => {
        let fillteredCharacters = [];
        fillteredCharacters = get().characterList.filter(data => {
            if(name == ''){
                return true;
            }
            else{
                return data.name.toLowerCase().includes(name.toLowerCase());
            }
        })

        set({ characterList: fillteredCharacters });
    },
    setBossList: (bosses: BossInfoProps[]) => {
        set({ bossList: bosses });
    },
    setBossInfo: (boss: BossInfoProps) => {
        set({ bossInfo: boss });
    },
    setCharacterList: (characters: CharacterInfoProps[]) => {
        set({ characterList: characters });
    },
    setCharacterInfo: (character: CharacterInfoProps) => {
        set({ characterInfo: character });
    }
}))

