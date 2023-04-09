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