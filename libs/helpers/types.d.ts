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
    role: string
    arenaID?: any
}

export declare interface AvatarProps{
    name: string
    src: string
}

type PlayerProps = {
    id: string | number
    name: string,
    avatar: string
}

export declare interface ArenaDraftProps{
    user_gm_id: string
    mode: "1v1" | "2v2" | "3v3" | "4v4" | string,
    is_manual_select_boss: any 
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
    title: string,
    onAcceptButton?: () => void
    onCloseButton?: () => void
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
    id:string | number
    username: string
    role: string
    avatar?: string
    arenaID?: string | string[] | undefined
};
  
export type UserSettingsProp = {
    video_bg: VideoPropsSettings;
};

export declare interface UserDataPropState {
    user: UserDataProp;
    settings: UserSettingsProp;
    arena_id: string | string[] | undefined
}

export type UserFeatureSettingProps = {
    setBackgroundBG : (vidSrc: VideoPropsSettings) => void
    setUserData: (userData: UserDataProp) => void 
    setArenaID: (arena: string | string[] | undefined) => void
}

export type ArenaPlayers = {
    id: string,
    arena_id:string
    user_id: string
    isActive?: boolean
    joinedDate: string,
    user: ProfileChanges
}

export type ArenaPlayersPayloadFeature = {
    player: string | undefined
    type: string | 'insert' | 'remove'
}

export type ArenaPlayersState = {
    arenaPlayers: ArenaPlayers[]
    modal: boolean
    playerInfo: PlayerProps
    player1: PlayerProps
    player2: PlayerProps
    modal_title: string
    player_function_type: ArenaPlayersPayloadFeature
}

export type ArenaPlayerFunction = {
    setArenaPlayersList: (arenaPlayers: ArenaPlayers[]) => void
    setModal: (modal: boolean) => void
    setPlayer1: (player: PlayerProps) => void
    setPlayer2: (player: PlayerProps) => void
    setPlayerInfo: (player: PlayerProps) => void
    setModalTitle: (title: string) => void
    setPlayerFunctionType: (data: ArenaPlayersPayloadFeature) => void
    setInstantNewArenaPlayer: (arenaPlayer: ArenaPlayers) => void
    setInstantRemoveArenaPlayer: (arenaID: string) => void
}

export type ArenaPlayersChooseProps = {
    id: string | number
    isChoose: boolean
}


export type PusherType = {
    appId: string | undefined
    key: string | undefined
    secret: string | undefined
    cluster: string | undefined
    useTLS: boolean
}

export type DraftStateProps = {
    init: string
}

export type DraftFunctions = {
    setInit: (init: string) => void
}