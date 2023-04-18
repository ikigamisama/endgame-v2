import RadioListCard from "@/components/RadioListCard";
import { useUserData, userStore } from "@/libs/providers/UserContext";
import { modeOption } from "@/libs/includes/forms";
import { LogoutIcon, ProfileIcon } from "@/libs/includes/icons";
import {
  ButtonPopUpNav,
  CenterBox,
  FontHeaderPopup,
  LinkTextMenu,
  ToastText,
} from "@/src/styles";
import {
  AreaCardWrapper,
  ArenaBossCircleWrapper,
  ArenaCard,
  ArenaCheckbox,
  ArenaPaddingWrap,
  ArenaPlayersListScroll,
  ArenaTitleText,
  AvatarCircle,
  AvatarName,
  AvatarNameWrapper,
} from "@/src/styles/Arena";
import {
  FormLabelText,
  FormSelect,
  FormSubmitButton,
} from "@/src/styles/login";
import {
  Box,
  Center,
  Container,
  Flex,
  FormControl,
  Grid,
  GridItem,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  SimpleGrid,
  Spinner,
  useRadioGroup,
  useToast,
} from "@chakra-ui/react";
import Head from "next/head";
import { CheckCircleIcon, CopyIcon, SettingsIcon } from "@chakra-ui/icons";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  ArenaDraftProps,
  ArenaPlayers,
  BossInfoProps,
  UserDataProp,
} from "@/libs/helpers/types";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { signOut } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/libs/providers/api";
import { useSettingsStore } from "@/libs/store/settings";
import { useEffect, useState } from "react";
import BackgroundVid from "@/components/BackgroundVid";
import { useArenaStore } from "@/libs/store/arena";
import PromptModal from "@/components/PromptModal";
import { pusherClient } from "@/libs/providers/pusherClient";

const Arena: NextPage = () => {
  const { state, setBackgroundVid } = useUserData();
  const router = useRouter();
  const [bossImg, setBossImg] = useState("");
  const { handleSubmit, control, watch, setValue } = useForm<ArenaDraftProps>({
    defaultValues: {
      user_gm_id: "",
      mode: "3v3",
      is_manual_select_boss: false,
      boss_id: "",
    },
  });

  const [arena_id] = userStore((state) => [state.arena_id]);

  const [bossList, setBossList] = useSettingsStore((state) => [
    state.bossList,
    state.setBossList,
  ]);

  const [
    arenaPlayers,
    setArenaPlayersList,
    modal,
    setModal,
    modal_title,
    setModalTitle,
    player1,
    player2,
    setPlayer1,
    setPlayer2,
    playerInfo,
    setPlayerInfo,
    player_function_type,
    setPlayerFunctionType,
    setInstantNewArenaPlayer,
    setInstantRemoveArenaPlayer,
  ] = useArenaStore((state) => [
    state.arenaPlayers,
    state.setArenaPlayersList,
    state.modal,
    state.setModal,
    state.modal_title,
    state.setModalTitle,
    state.player1,
    state.player2,
    state.setPlayer1,
    state.setPlayer2,
    state.playerInfo,
    state.setPlayerInfo,
    state.player_function_type,
    state.setPlayerFunctionType,
    state.setInstantNewArenaPlayer,
    state.setInstantRemoveArenaPlayer,
  ]);

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "mode",
    defaultValue: "3v3",
    onChange: (d: string) => {
      setValue("mode", d);
    },
  });

  const group = getRootProps();
  const toastCopyLink = useToast();
  const watchCheckboxBoss: any = watch("is_manual_select_boss"),
    watchBossChoose = watch("boss_id");

  const bossListQuery = useQuery({
    queryKey: ["listBossArena"],
    queryFn: async () => {
      const listResponse = await api.get("/boss/list");
      return listResponse.data.list;
    },
    onSuccess: (data: BossInfoProps[]) => {
      setBossList(data);
    },
  });

  const arenaPlayersQueryGM = useQuery({
    queryKey: ["listArenaPlayers"],
    queryFn: async () => {
      const listResponse = await api.post("/arena/players/list", {
        arenaID: router.query?.arenaID,
        role: state.user.role,
      });
      return listResponse.data.list;
    },
    onSuccess: (data: ArenaPlayers[]) => {
      let removePlayerIfSelected = data.filter(
        (i) => i.id !== player1.id && i.id !== player2.id
      );

      setArenaPlayersList(removePlayerIfSelected);
    },
  });

  const onLogout = useMutation({
    mutationFn: async (data: UserDataProp) => {
      let submitResponse = await api.post("/account/player/logout", data);
      return submitResponse.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        signOut({ callbackUrl: "/" });
      }
    },
  });

  const startDraft = useMutation({
    mutationFn: async (data: any) => {
      let submitResponse = await api.post("/arena/draft/start", data);
      return submitResponse.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        router.push(`/arena/${arena_id}/draft/123`);
      }
    },
  });

  const submitArenaToDraft: SubmitHandler<ArenaDraftProps> = (data) => {
    startDraft.mutate({
      arenaID: arena_id,
      player1: player1.user_id,
      player2: player2.user_id,
    });
  };

  useEffect(() => {
    bossList.filter((b) => {
      if (watchBossChoose === b.id) {
        setBossImg(b.picture);
      }
    });
  }, [watchBossChoose]);

  useEffect(() => {
    const arenaChannel = pusherClient.subscribe("arena-room"),
      draftChannel = pusherClient.subscribe("drafting");

    arenaChannel.bind("new-arena-players", (data: any) => {
      if (data.arenaID === router.query.arenaID) {
        setInstantNewArenaPlayer({
          id: data.arenaPlayers.id,
          arena_id: data.arenaPlayers.arena_id,
          user_id: data.arenaPlayers.user_id,
          isActive: data.arenaPlayers.isActive,
          joinedDate: data.arenaPlayers.joinedDate,
          user: data.user,
        });
      }
    });

    arenaChannel.bind("remove-arena-players", (data: any) => {
      if (data.arenaID === router.query.arenaID) {
        setInstantRemoveArenaPlayer(data.arenaPlayerID);
      }
    });
    draftChannel.bind("arena-player-route", (data: any) => {
      if (data.arena_id === router.query.arenaID) {
        if (data.player1 === state.user.id) {
          router.push(`/arena/${data.arena_id}/draft/123`);
        }

        if (data.player2 === state.user.id) {
          router.push(`/arena/${data.arena_id}/draft/123`);
        }
      }
    });

    return () => {
      arenaChannel.unbind();
      draftChannel.unbind();
      pusherClient.unsubscribe(arenaChannel.name);
      pusherClient.unsubscribe(draftChannel.name);
    };
  }, [router]);

  const openModalConfirmSetPlayer = (
    playerData: ArenaPlayers,
    isApply: string,
    playerSpot?: string
  ) => {
    let playerPositon =
      isApply === "insert"
        ? player1.id === ""
          ? "player1"
          : "player2"
        : playerSpot;

    let title =
      isApply === "insert"
        ? `Are you sure to place this on ${playerPositon}`
        : `Are you sure to remove this on ${playerSpot}`;

    setPlayerInfo(playerData);
    setModalTitle(title);
    setPlayerFunctionType({
      player: playerPositon,
      type: isApply,
    });
    setModal(true);
  };

  const onAcceptSetPlayer = () => {
    if (player_function_type.type === "insert") {
      setInstantRemoveArenaPlayer(playerInfo.id);
    } else {
      setInstantNewArenaPlayer(playerInfo);
    }
    setModal(false);

    const emptyData = {
      id: "",
      arena_id: "",
      user_id: "",
      isActive: true,
      joinedDate: "",
      user: {
        id: "",
        username: "",
        role: "",
        avatar: "",
      },
    };

    if (player_function_type.type === "insert") {
      if (player1.id === "") {
        setPlayer1(playerInfo);
      } else {
        setPlayer2(playerInfo);
      }
    } else {
      if (player_function_type.player === "player1") {
        setPlayer1(emptyData);
      } else {
        setPlayer2(emptyData);
      }
    }

    setPlayerInfo(emptyData);
  };
  const onCloseModal = () => {
    setModal(!modal);
  };
  console.log(state.settings.video_bg);
  return (
    <>
      <Head>
        <title>Arena - Endgame</title>
        <meta name="description" content="Endgame Gramdmaster Login" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {state.user.id !== "" && (
        <BackgroundVid
          mp4={state.settings.video_bg.mp4}
          webm={state.settings.video_bg.webm}
        />
      )}

      <PromptModal
        isOpen={modal}
        onClose={onCloseModal}
        title={modal_title}
        onAcceptButton={onAcceptSetPlayer}
      />
      <Box as="nav" w="100%">
        <Flex
          px={10}
          py={5}
          w="100%"
          justifyContent="flex-end"
          direction="row"
          gap={4}
        >
          <Box>
            <Popover placement="bottom-start">
              <PopoverTrigger>
                <ButtonPopUpNav>
                  <SettingsIcon boxSize={7} />
                </ButtonPopUpNav>
              </PopoverTrigger>
              <PopoverContent bgColor="#1e223f">
                <FontHeaderPopup fontWeight="semibold" p={4}>
                  Settings
                </FontHeaderPopup>
                <PopoverArrow />

                <PopoverBody px={4} pb={5}>
                  <FormControl>
                    <FormLabelText>Background Video</FormLabelText>
                    <FormSelect
                      placeContent="random"
                      value={state?.settings?.video_bg?.mp4
                        .replace("/video/bg/", "")
                        .replace("_bg.mp4", "")}
                      onChange={(e) => {
                        setBackgroundVid({
                          mp4: "/video/bg/" + e.target.value + "_bg.mp4",
                          webm: "/video/bg/" + e.target.value + "_bg.webm",
                        });
                      }}
                    >
                      <option value="stars">Default</option>
                      <option value="anemo">Anemo</option>
                      <option value="cryo">Cryo</option>
                      <option value="dendro">Dendro</option>
                      <option value="electro">Electro</option>
                      <option value="geo">Geo</option>
                      <option value="hydro">Hydro</option>
                      <option value="pyro">Pyro</option>
                    </FormSelect>
                  </FormControl>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Box>
          <Box>
            <Menu>
              <MenuButton>
                <ButtonPopUpNav>
                  <ProfileIcon />
                </ButtonPopUpNav>
              </MenuButton>
              <MenuList bgColor="#1e223f">
                {state.user.role === "GM" && (
                  <MenuItem
                    bgColor="#1e223f"
                    _hover={{
                      transition: "0.25s all",
                      backgroundColor: "#443C60",
                    }}
                    onClick={() => router.push("/arena/settings")}
                  >
                    <HStack>
                      <SettingsIcon boxSize={5} />
                      <LinkTextMenu>Draft Settings</LinkTextMenu>
                    </HStack>
                  </MenuItem>
                )}
                <MenuItem
                  bgColor="#1e223f"
                  _hover={{
                    transition: "0.25s all",
                    backgroundColor: "#443C60",
                  }}
                  onClick={() => {
                    if (state.user.role === "GM") {
                      signOut({ callbackUrl: "/login" });
                    } else {
                      onLogout.mutate({
                        ...state.user,
                        arenaID: router.query?.arenaID,
                      });
                    }
                  }}
                >
                  <HStack>
                    <LogoutIcon />
                    <LinkTextMenu>Logout</LinkTextMenu>
                  </HStack>
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Flex>
      </Box>
      {state.user.id === "" ? null : (
        <Box position="relative" h="calc(100vh - 90px)" w="100%">
          <CenterBox>
            <Container maxW="container.xl" minW="1200px">
              {state?.user?.role === "GM" ? (
                <HStack w="100%" gap={8}>
                  <Flex w="65%">
                    <ArenaCard>
                      <AreaCardWrapper widthgap="95%">
                        <ArenaPaddingWrap>
                          <ArenaTitleText>Game Setup</ArenaTitleText>
                        </ArenaPaddingWrap>

                        <form
                          method="post"
                          onSubmit={handleSubmit(submitArenaToDraft)}
                        >
                          <ArenaPlayersListScroll heightarea="535px">
                            <ArenaPaddingWrap>
                              <FormControl mb="35px">
                                <FormLabelText>Mode</FormLabelText>

                                <HStack {...group} w="100">
                                  {modeOption.map((value) => {
                                    const radio = getRadioProps({ value });
                                    return (
                                      <RadioListCard key={value} {...radio}>
                                        {value}
                                      </RadioListCard>
                                    );
                                  })}
                                </HStack>
                              </FormControl>

                              <SimpleGrid columns={2} spacing={8} mb="35px">
                                <FormControl>
                                  <FormLabelText>First Pick Team</FormLabelText>
                                  <Box
                                    position="relative"
                                    cursor="pointer"
                                    onClick={() => {
                                      openModalConfirmSetPlayer(
                                        {
                                          id: player1.id,
                                          arena_id: player1.arena_id,
                                          user_id: player1.user_id,
                                          isActive: player1.isActive,
                                          joinedDate: player1.joinedDate,
                                          user: {
                                            id: player1.user?.id,
                                            username: player1.user?.username,
                                            role: player1.user?.role,
                                            avatar: player1.user?.avatar,
                                          },
                                        },
                                        "remove",
                                        "player1"
                                      );
                                    }}
                                  >
                                    <AvatarCircle>
                                      {player1.id !== "" && (
                                        <Image
                                          src={player1.user?.avatar}
                                          alt="avatar"
                                          width="100%"
                                        />
                                      )}
                                    </AvatarCircle>
                                    <AvatarNameWrapper>
                                      <AvatarName>
                                        {player1.id !== "" &&
                                          player1.user?.username}
                                      </AvatarName>
                                    </AvatarNameWrapper>
                                  </Box>
                                </FormControl>
                                <FormControl>
                                  <FormLabelText>
                                    Second Pick Team
                                  </FormLabelText>
                                  <Box
                                    position="relative"
                                    cursor="pointer"
                                    onClick={() => {
                                      openModalConfirmSetPlayer(
                                        {
                                          id: player2.id,
                                          arena_id: player2.arena_id,
                                          user_id: player2.user_id,
                                          isActive: player2.isActive,
                                          joinedDate: player2.joinedDate,
                                          user: {
                                            id: player2.user?.id,
                                            username: player2.user?.username,
                                            role: player2.user?.role,
                                            avatar: player2.user?.avatar,
                                          },
                                        },
                                        "remove",
                                        "player2"
                                      );
                                    }}
                                  >
                                    <AvatarCircle>
                                      {player2.id !== "" && (
                                        <Image
                                          src={player2.user?.avatar}
                                          alt="avatar"
                                          width="100%"
                                        />
                                      )}
                                    </AvatarCircle>
                                    <AvatarNameWrapper>
                                      <AvatarName>
                                        {player2.id !== "" &&
                                          player2.user?.username}
                                      </AvatarName>
                                    </AvatarNameWrapper>
                                  </Box>
                                </FormControl>
                              </SimpleGrid>

                              <FormControl mb="35px">
                                <FormLabelText>Link</FormLabelText>
                                <FormSubmitButton
                                  type="button"
                                  leftIcon={<CopyIcon />}
                                  onClick={() => {
                                    navigator.clipboard.writeText(
                                      window.location.host +
                                        "/login/arena/" +
                                        router.query?.arenaID
                                    );
                                    toastCopyLink({
                                      duration: 3000,
                                      render: () => (
                                        <Box
                                          bgColor="#1E223F"
                                          p={4}
                                          display="flex"
                                          flexDirection="row"
                                          alignItems="center"
                                          gap={4}
                                        >
                                          <CheckCircleIcon boxSize={5} />
                                          <ToastText>Link Copied</ToastText>
                                        </Box>
                                      ),
                                    });
                                  }}
                                >
                                  Copy Link
                                </FormSubmitButton>
                              </FormControl>

                              <FormControl mb="35px">
                                <Controller
                                  render={({
                                    field: { onChange, value, name },
                                  }) => (
                                    <ArenaCheckbox
                                      size="lg"
                                      onChange={onChange}
                                      value={value}
                                      name={name}
                                      defaultChecked={value}
                                    >
                                      Manually Select Boss
                                    </ArenaCheckbox>
                                  )}
                                  name="is_manual_select_boss"
                                  control={control}
                                />
                              </FormControl>

                              <HStack
                                hidden={
                                  watchCheckboxBoss === false ||
                                  bossListQuery.isLoading === true
                                    ? true
                                    : false
                                }
                                gap={4}
                                alignItems="center"
                                mb="35px"
                              >
                                <FormControl>
                                  <FormLabelText>Boss Enemy</FormLabelText>
                                  <Controller
                                    render={({
                                      field: { onChange, value, name },
                                    }) => (
                                      <FormSelect
                                        placeholder="Select Boss"
                                        onChange={onChange}
                                        value={value}
                                        name={name}
                                      >
                                        {bossList.map((b, i) => (
                                          <option value={b.id} key={i}>
                                            {b.name}
                                          </option>
                                        ))}
                                      </FormSelect>
                                    )}
                                    name="boss_id"
                                    control={control}
                                  />
                                </FormControl>
                                <Box>
                                  <ArenaBossCircleWrapper>
                                    {bossImg !== "" ? (
                                      <Image src={bossImg} w="100%" />
                                    ) : null}
                                  </ArenaBossCircleWrapper>
                                </Box>
                              </HStack>
                            </ArenaPaddingWrap>
                          </ArenaPlayersListScroll>

                          <ArenaPaddingWrap>
                            <FormSubmitButton type="submit">
                              Start Game
                            </FormSubmitButton>
                          </ArenaPaddingWrap>
                        </form>

                        <Box pb="25px" />
                      </AreaCardWrapper>
                    </ArenaCard>
                  </Flex>
                  <Flex w="35%">
                    <ArenaCard>
                      <AreaCardWrapper widthgap="92%">
                        <ArenaPaddingWrap>
                          <ArenaTitleText>Players</ArenaTitleText>
                        </ArenaPaddingWrap>

                        <ArenaPlayersListScroll heightarea="605px">
                          <ArenaPaddingWrap>
                            <Grid templateColumns="repeat(1, 1fr)" gap={6}>
                              {arenaPlayersQueryGM.isLoading === true ? (
                                <Center height="150px">
                                  <Spinner
                                    thickness="15px"
                                    speed="0.5s"
                                    emptyColor="#ECDEB5"
                                    color="#1E223F"
                                    width="150px"
                                    height="150px"
                                  />
                                </Center>
                              ) : (
                                <>
                                  {arenaPlayers.map((arenaP, a) => (
                                    <GridItem key={a}>
                                      <Box
                                        position="relative"
                                        cursor="pointer"
                                        onClick={() => {
                                          openModalConfirmSetPlayer(
                                            {
                                              id: arenaP.id,
                                              arena_id: arenaP.arena_id,
                                              user_id: arenaP.user_id,
                                              isActive: arenaP.isActive,
                                              joinedDate: arenaP.joinedDate,
                                              user: arenaP.user,
                                            },
                                            "insert"
                                          );
                                        }}
                                      >
                                        <AvatarCircle>
                                          <Image
                                            src={arenaP?.user?.avatar}
                                            alt="avatar"
                                            width="100%"
                                          />
                                        </AvatarCircle>
                                        <AvatarNameWrapper>
                                          <AvatarName>
                                            {arenaP?.user?.username}
                                          </AvatarName>
                                        </AvatarNameWrapper>
                                      </Box>
                                    </GridItem>
                                  ))}
                                </>
                              )}
                            </Grid>
                          </ArenaPaddingWrap>
                        </ArenaPlayersListScroll>
                      </AreaCardWrapper>

                      <Box pb="25px" />
                    </ArenaCard>
                  </Flex>
                </HStack>
              ) : (
                <ArenaCard>
                  <AreaCardWrapper widthgap="96%">
                    <ArenaPaddingWrap>
                      <ArenaTitleText>Players</ArenaTitleText>
                    </ArenaPaddingWrap>

                    <ArenaPlayersListScroll heightarea="605px">
                      <ArenaPaddingWrap>
                        {arenaPlayersQueryGM.isLoading === true ? (
                          <Center w="100%" h="500px">
                            <Spinner
                              thickness="15px"
                              speed="0.5s"
                              emptyColor="#ECDEB5"
                              color="#1E223F"
                              width="250px"
                              height="250px"
                            />
                          </Center>
                        ) : (
                          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                            {arenaPlayers.map((arenaP, a) => (
                              <GridItem key={a}>
                                <Box position="relative" cursor="pointer">
                                  <AvatarCircle
                                    isplayerasuser={
                                      arenaP?.user_id === state?.user?.id
                                        ? "true"
                                        : "false"
                                    }
                                  >
                                    <Image
                                      src={arenaP?.user?.avatar}
                                      alt="avatar"
                                      width="100%"
                                    />
                                  </AvatarCircle>
                                  <AvatarNameWrapper>
                                    <AvatarName>
                                      {arenaP?.user?.username}
                                    </AvatarName>
                                  </AvatarNameWrapper>
                                </Box>
                              </GridItem>
                            ))}
                          </Grid>
                        )}
                      </ArenaPaddingWrap>
                    </ArenaPlayersListScroll>
                  </AreaCardWrapper>

                  <Box pb="25px" />
                </ArenaCard>
              )}
            </Container>
          </CenterBox>
        </Box>
      )}
    </>
  );
};

export default Arena;
