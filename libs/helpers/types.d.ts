export declare interface UserFeatureAction {
    type: USER_FEATURE;
    payload: any;
} 

export declare interface GMLoginProps {
    gm_name: string | number 
    secret_key: string | number 
    role: string | ""
    game_type: string | number 
}


export declare interface PlayerLoginProps{
    team_name: string | number 
    avatar: string 
}

export declare interface AvatarProps{
    name: string
    src: string
}

type PlayerProps = {
    id: string | number
    name: string
}

export declare interface ArenaDraftProps{
    user_gm_id: string
    mode: "1v1" | "2v2" | "3v3" | "4v4" | string,
    first_player: PlayerProps
    second_player: PlayerProps
    is_manual_select_boss: boolean | undefined
    boss_id?: string
}

export type GetRandomNumberOptions = {
    decimalPlaces?: number;
};


export declare interface DraftPositionProps{
    aligndraft: 'left' | 'right' | string
    widthcharacter?: string
    colorcharacter?: string
    indexcharacter?: string
    statusdraft?: 'pick' | 'ban' | 'none' | string
    currentpickdraft?: 'true' | 'false'
}

export declare interface IconSizeSVGProps{
    width: string
    height: string
}

export declare interface ModalFeatures{
    isOpen: boolean
    onClose: () => void
    title: string
}
export declare interface ModalBoss{
    isOpen: boolean
    onClose: () => void
    onAccept: () => void
    onDecline: () => void
    boss: string
    timer: number
}

export declare interface CharacterDraftDesignProps{
    ischaractermodalactive?: 'true' | 'false' | string
    isselectedeleemnt? : 'true' | 'false' | string
    rarity?: '4' | '5' | string,
    colorpickedcharacter?: string
    drafttype?: 'pick' | 'ban' | string
    currentdraft? : 'true' | 'false' | string
}

export declare interface CharacterDraftProps{
    statusCharacterModal: boolean
    onCloseCharacterModal?: () => void
    onOpenCharacterModal?: () => void
}

export declare interface ProfileChanges{
    id?: string,
    username: string
    role: string
    avatar: string 
    password?: string
    confirm_password?: string
}

export declare interface BossInfoProps{
    id?: string
    name: string
    picture: string
    picture_choose: string
    picture_flash: string
    is_visible: any
}

export declare interface CharacterInfoProps{
    id?: string,
    name: string
    display_name: string
    rarity: string
    vision: any
    weapon: string
    draft_picture: string
    pick_picture: string
    flash_picture: string
    ban_picture: string
    ban_audio:   string
    pick_audio:  string
    is_visible: any
}


export declare interface VideoProerties {
    videoheight: string;
}


export type SettingState = {
   isGeneratePassword: boolean;
   userList: ProfileChanges[]
   bossList: BossInfoProps[]
   characterList: CharacterInfoProps[]
   searchUser: string
   searchCharacter: string
   userInfo:  ProfileChanges
   bossInfo:  BossInfoProps
   characterInfo:  CharacterInfoProps
}

export type SettingActions = {
    applyGeneratePassword: (isGonnaGeneratePassword: boolean) => void 
    setUserList: (users: ProfileChanges[]) => void
    setUserInfo: (boss: ProfileChanges) => void
    setSearchUser: (search: string) => void
    setSearchCharacter: (search: string) => void
    searchUserList: (name: string) => vold
    searchCharacterList: (name: string) => vold
    setBossList: (bosses: BossInfoProps[]) => void
    setBossInfo: (boss: BossInfoProps) => void
    setCharacterList: (characters: CharacterInfoProps[]) => void
    setCharacterInfo: (character: CharacterInfoProps) => void
}


export type VideoPropsSettings = {
    mp4: string;
    webm: string;
    height?: string;
};

export type UserDataProp = {
    id:string;
    username: string;
    role: string;
};
  
export type UserSettingsProp = {
    video_bg: VideoPropsSettings;
};

export declare interface UserDataPropState {
    user: UserDataProp;
    settings: UserSettingsProp;
    arena_id: string
}

export type UserFeatureSettingProps = {
    setBackgroundBG : (vidSrc: VideoPropsSettings) => void
    setUserData: (userData: UserDataProp) => void 
    setArenaID: (arena: string) => void
}