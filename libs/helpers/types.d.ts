export type UserDataProp = {
    email: string;
    role: string;
  };
  
export type UserSettingsProp = {
    video_bg: VideoPropsSettings;
};

export type VideoPropsSettings = {
    mp4: string;
    webm: string;
};
  

export declare interface UserFeatureAction {
    type: USER_FEATURE;
    payload: any;
}  
  
export declare interface UserDataPropState {
    user: UserDataProp;
    settings: UserSettingsProp;
}
  
export declare interface GMLoginProps {
    gm_name: string | number 
    secret_key: string | number 
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

export declare interface CharacterDraftDesignProps{
    ischaractermodalactive?: 'true' | 'false' | string
    isselectedeleemnt? : 'true' | 'false' | string
}

export declare interface CharacterDraftProps{
    statusCharacterModal: boolean
    onCloseCharacterModal?: () => void
    onOpenCharacterModal?: () => void
}