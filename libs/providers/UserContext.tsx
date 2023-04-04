import { createContext, useContext, useReducer } from "react";
import { video_list } from "@/libs/includes/videos";

export enum USER_FEATURE {
  LOGIN_GM_USER = "LOGIN_GM_USER",
  LOGIN_PLAYER_USER = "LOGIN_PLAYER_USER",
  UPDATE_SETTINGS = "UPDATE_SETTINGS",
  LOGOUT_USER = "LOGOUT_USER",
}

interface UserFeatureAction {
  type: USER_FEATURE;
  payload: any;
}

type UserDataProp = {
  email: string;
  role: string;
};

type UserSettingsProp = {
  video_bg: VideoPropsSettings;
};

type VideoPropsSettings = {
  mp4: string;
  webm: string;
};

interface UserDataPropState {
  user: UserDataProp;
  settings: UserSettingsProp;
}

const currentUserState = {
  user: {
    email: "ikigamidevs.15@gmail.com",
    role: "GM",
  },
  settings: {
    video_bg: {
      mp4: video_list[0].mp4,
      webm: video_list[0].webm,
    },
  },
};

const UserDataContext = createContext<{
  state: UserDataPropState;
  dispatch: React.Dispatch<UserFeatureAction>;
}>({ state: currentUserState, dispatch: () => null });

export const UserProvider = ({ children }: any) => {
  const [userData, dispatch] = useReducer(userReducer, currentUserState);

  return (
    <UserDataContext.Provider value={{ state: userData, dispatch }}>
      {children}
    </UserDataContext.Provider>
  );
};

export function useUserData() {
  return useContext(UserDataContext);
}

function userReducer(
  userData: UserDataPropState,
  action: UserFeatureAction
): UserDataPropState {
  switch (action.type) {
    case USER_FEATURE.LOGIN_GM_USER:
      return {
        ...userData,
        settings: action.payload,
      };
    case USER_FEATURE.LOGIN_PLAYER_USER:
      return {
        ...userData,
        settings: action.payload,
      };
    case USER_FEATURE.UPDATE_SETTINGS:
      return {
        ...userData,
        settings: action.payload,
      };
    case USER_FEATURE.LOGOUT_USER:
      return { ...userData };
    default:
      return userData;
  }
}
