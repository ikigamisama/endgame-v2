import { create } from "zustand";
import { createContext, useContext, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  UserDataProp,
  UserDataPropState,
  UserFeatureSettingProps,
  VideoPropsSettings,
} from "@/libs/helpers/types";
import { useRouter } from "next/router";
import { api } from "./api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { video_list } from "@/libs/includes/videos";

const currentUserState: UserDataPropState = {
  user: {
    id: "",
    username: "",
    role: "",
    avatar: "",
  },
  settings: {
    video_bg: {
      mp4: video_list["Default"].mp4,
      webm: video_list["Default"].webm,
    },
  },
  arena_id: "",
};

export const userStore = create<UserDataPropState & UserFeatureSettingProps>(
  (set, get) => ({
    ...currentUserState,
    setBackgroundBG: (vidSrc: VideoPropsSettings) => {
      set({ settings: { video_bg: vidSrc } });
    },
    setUserData: (userData: UserDataProp) => {
      set({ user: userData });
    },
    setArenaID: (arena: string) => {
      set({ arena_id: arena });
    },
  })
);

const UserDataContext = createContext<{
  state: UserDataPropState;
  setBackgroundVid: (data: VideoPropsSettings) => void;
}>({ state: currentUserState, setBackgroundVid: () => null });

export function useUserData() {
  return useContext(UserDataContext);
}

export const UserProvider = ({ children }: any) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [user, settings, arena_id, setUserData, setBackgroundBG, setArenaID] =
    userStore((state) => [
      state.user,
      state.settings,
      state.arena_id,
      state.setUserData,
      state.setBackgroundBG,
      state.setArenaID,
    ]);

  const arenaQuery = useQuery({
    queryKey: ["arenaData"],
    queryFn: async () => {
      const listResponse = await api.get("/arena/get");
      return listResponse.data;
    },
    onSuccess: (data) => {
      if (session?.user?.role === "GM") {
        setArenaID(data.arena.uid);
      }
    },
  });

  const editSettings = useMutation({
    mutationFn: async (data: VideoPropsSettings) => {
      let submitResponse = await api.put("/account/settings/edit", data);
      return submitResponse.data;
    },
    onSuccess: (data) => {
      if (data.success) {
      }
    },
  });

  const getSettings = useQuery({
    queryKey: ["settingsFeat"],
    queryFn: async () => {
      const listResponse = await api.get("/account/settings/get");
      return listResponse.data;
    },
  });

  useEffect(() => {
    const loginRouteList = ["/", "/login", "/login/arena/[arenaID]"];

    if (inArray(router.pathname, loginRouteList)) {
      if (status === "authenticated") {
        if (session?.user?.role === "GM") {
          if (!arenaQuery.isLoading) {
            router.push(`/arena/${arena_id}`);
          }
        }
      }
    } else {
      if (status === "unauthenticated") {
        router.push("/");
      }
    }
  }, [status, router.pathname, arenaQuery]);

  useEffect(() => {
    if (status === "authenticated") {
      if (!getSettings.isLoading) {
        setBackgroundBG(getSettings.data.settings);
        setUserData(getSettings.data.user);
      }
    }
  }, [status, getSettings.data, getSettings.isLoading]);

  const inArray = (needle: string, haystack: any) => {
    let length = haystack.length;
    for (var i = 0; i < length; i++) {
      if (haystack[i] == needle) return true;
    }
    return false;
  };

  const setBackgroundVid = (data: VideoPropsSettings) => {
    setBackgroundBG(data);
    editSettings.mutate(data);
  };

  return (
    <UserDataContext.Provider
      value={{
        state: {
          user: { ...user },
          settings: { ...settings },
          arena_id: arena_id,
        },
        setBackgroundVid,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};
