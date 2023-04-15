import RadioListCard from "@/components/RadioListCard";
import { useUserData } from "@/libs/providers/UserContext";
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
  useRadioGroup,
  useToast,
} from "@chakra-ui/react";
import Head from "next/head";
import { CheckCircleIcon, CopyIcon, SettingsIcon } from "@chakra-ui/icons";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  ArenaDraftProps,
  BossInfoProps,
  UserDataProp,
} from "@/libs/helpers/types";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { signOut } from "next-auth/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/libs/providers/api";
import { useSettingsStore } from "@/libs/store/settings";
import { useEffect, useState } from "react";
import BackgroundVid from "@/components/BackgroundVid";

const Arena: NextPage = () => {
  const { state, setBackgroundVid } = useUserData();
  const router = useRouter();
  const [bossImg, setBossImg] = useState("");
  const { handleSubmit, control, watch, setValue } = useForm<ArenaDraftProps>({
    defaultValues: {
      user_gm_id: "",
      mode: "3v3",
      first_player: {
        id: "",
        name: "",
        avatar: "",
      },
      second_player: {
        id: "",
        name: "",
        avatar: "",
      },
      is_manual_select_boss: true,
      boss_id: "",
    },
  });

  const [bossList, setBossList] = useSettingsStore((state) => [
    state.bossList,
    state.setBossList,
  ]);

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "mode",
    defaultValue: "3v3",
    onChange: (d) => {
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

  const submitArenaToDraft: SubmitHandler<ArenaDraftProps> = (data) => {
    router.push("/arena/123/draft/123");
  };

  useEffect(() => {
    bossList.filter((b) => {
      if (watchBossChoose === b.id) {
        setBossImg(b.picture);
      }
    });
  }, [watchBossChoose]);

  console.log();

  return (
    <>
      <Head>
        <title>Arena - Endgame</title>
        <meta name="description" content="Endgame Gramdmaster Login" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BackgroundVid
        mp4={state.settings.video_bg.mp4}
        webm={state.settings.video_bg.webm}
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
                      onLogout.mutate(state.user);
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
      <Box position="relative" h="calc(100vh - 90px)" w="100%">
        <CenterBox>
          <Container maxW="container.xl" minW="1200px">
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
                              <Box position="relative" cursor="pointer">
                                <AvatarCircle>
                                  {/* <Image
                                    src="https://api.dicebear.com/6.x/adventurer/svg?seed=Baby"
                                    alt="avatar"
                                    width="100%"
                                  /> */}
                                </AvatarCircle>
                                <AvatarNameWrapper>
                                  <AvatarName></AvatarName>
                                </AvatarNameWrapper>
                              </Box>
                            </FormControl>
                            <FormControl>
                              <FormLabelText>Second Pick Team</FormLabelText>
                              <Box position="relative" cursor="pointer">
                                <AvatarCircle>
                                  {/* <Image
                                    src="https://api.dicebear.com/6.x/adventurer/svg?seed=Baby"
                                    alt="avatar"
                                    width="100%"
                                  /> */}
                                </AvatarCircle>
                                <AvatarNameWrapper>
                                  <AvatarName></AvatarName>
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
                                  checked={value}
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
                                    required
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
                          {/* <GridItem>
                            <Box position="relative" cursor="pointer">
                              <AvatarCircle>
                                <Image
                                  src="https://api.dicebear.com/6.x/adventurer/svg?seed=Baby"
                                  alt="avatar"
                                  width="100%"
                                />
                              </AvatarCircle>
                              <AvatarNameWrapper>
                                <AvatarName>Apple</AvatarName>
                              </AvatarNameWrapper>
                            </Box>
                          </GridItem> */}
                        </Grid>
                      </ArenaPaddingWrap>
                    </ArenaPlayersListScroll>
                  </AreaCardWrapper>

                  <Box pb="25px" />
                </ArenaCard>
              </Flex>
            </HStack>
          </Container>
        </CenterBox>
      </Box>
    </>
  );
};

export default Arena;
