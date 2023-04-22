import BackgroundVid from "@/components/BackgroundVid";
import CharacterDraft from "@/components/CharacterDraft";
import DraftCountdown from "@/components/DraftCountdown";
import DraftFooter from "@/components/DraftFooter";
import DraftHeader from "@/components/DraftHeader";
import {
  DraftInfoProps,
  ModalBoss,
  TimerUpdateProps,
} from "@/libs/helpers/types";
import { convertVisionToColor } from "@/libs/includes/color";
import {
  AnemoVisionIcon,
  CryoVisionIcon,
  DendroVisionIcon,
  ElectroVisionIcon,
  GeoVisionIcon,
  HydroVisionIcon,
  PyroVisionIcon,
} from "@/libs/includes/icons";
import { WarpImgPNG, WarpImgGIF } from "@/libs/includes/image";
import { useUserData } from "@/libs/providers/UserContext";
import { api } from "@/libs/providers/api";
import { pusherClient } from "@/libs/providers/pusherClient";
import { useDraftStore } from "@/libs/store/draft";
import { ModalCharacterPickBlur } from "@/src/styles/CharacterPick";
import {
  BossChooseText,
  BossChooseWrapper,
  BossModalButtons,
  DraftBossCard,
  DraftBossCardBGImg,
  DraftCharacterContainer,
  DraftCharacterName,
  DraftCharacterNameWrapper,
  DraftCharacterPickBanner,
  DraftPickBanner,
  DraftPickBannerWrapper,
} from "@/src/styles/Draft";
import { EndgameModalContent, EndgameModalWrapper } from "@/src/styles/Modal";
import {
  Box,
  Center,
  Container,
  Flex,
  Image,
  Img,
  Modal,
  ModalBody,
  ModalOverlay,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { motion } from "framer-motion";

const ModalBoss = ({
  isOpen,
  onClose,
  onAccept,
  onDecline,
  boss,
  timer,
}: ModalBoss) => {
  return (
    <Modal
      onClose={onClose}
      size="3xl"
      isOpen={isOpen}
      motionPreset="slideInBottom"
      isCentered
    >
      <ModalOverlay />

      <EndgameModalContent>
        <EndgameModalWrapper>
          <ModalBody p={10}>
            <Center>
              <BossChooseWrapper>
                <Img
                  src="https://endgame.otakuhobbitoysph.com/cdn/boss/icon/Aeonblight_Drake.png"
                  width="100%"
                />
              </BossChooseWrapper>
            </Center>
            <BossChooseText fontSize="2.5rem" mb={8}>
              {boss} is selected randomly. Reroll ?
            </BossChooseText>

            <SimpleGrid columns={2} spacing={8} mb={8}>
              <BossModalButtons onClick={onAccept}>Accept</BossModalButtons>
              <BossModalButtons onClick={onDecline}>Decline</BossModalButtons>
            </SimpleGrid>

            <BossChooseText fontSize="1.25rem">
              Automatically declient after {timer} seconds
            </BossChooseText>
          </ModalBody>
        </EndgameModalWrapper>
      </EndgameModalContent>
    </Modal>
  );
};

const Drafting: NextPage = () => {
  const { state, setBackgroundVid } = useUserData();
  const router = useRouter();

  const [
    applyCharacterModal,
    setApplyCharacterModal,
    applyBossModal,
    setApplyBossModal,
    isStartDraft,
    setIsStartDraft,
    player1,
    player2,
    setPlayer1Info,
    setPlayer2Info,
    pick,
    ban,
    setPickList,
    setBanList,
    banWidthSize,
    boss,
    setBossInfo,
    timer,
    setTimer,
    sequence,
    setSequenceList,
  ] = useDraftStore((state) => [
    state.applyCharacterModal,
    state.setApplyCharacterModal,
    state.applyBossModal,
    state.setApplyBossModal,
    state.isStartDraft,
    state.setIsStartDraft,
    state.player1,
    state.player2,
    state.setPlayer1Info,
    state.setPlayer2Info,
    state.pick,
    state.ban,
    state.setPickList,
    state.setBanList,
    state.banWidthSize,
    state.boss,
    state.setBossInfo,
    state.timer,
    state.setTimer,
    state.sequence,
    state.setSequenceList,
  ]);

  const onToggleCharacterPickModal = () => {
    setApplyCharacterModal(!applyCharacterModal);
  };

  const onToggleBossRevealModal = () => {
    setApplyBossModal(!applyBossModal);
  };

  const onAcceptRerollBoss = () => {};

  const onDeclineRerollBoss = () => {};

  const timerUpdate = useMutation({
    mutationFn: async (data: TimerUpdateProps) => {
      let submitResponse = await api.post("/arena/draft/timer", data);
      return submitResponse.data;
    },
  });

  useEffect(() => {
    const arenaChannel = pusherClient.subscribe("arena-room"),
      draftChannel = pusherClient.subscribe("drafting"),
      timerChannel = pusherClient.subscribe("draft_timer");

    arenaChannel.bind("back-arena", (data: any) => {
      if (router.query.draftID === data.draftID) {
        router.push(`/arena/${data.arenaID}`);
      }
    });
    let interval: any;
    timerChannel.bind("update", (data: any) => {
      if (router.query.draftID === data.draft_id) {
        let countdown = data.timer;
        setTimer(countdown);

        if (data.isPauseTimer) {
          clearInterval(interval);
        } else {
          interval = setInterval(() => {
            countdown--;
            setTimer(countdown);

            if (state.user.role === "GM") {
              timerUpdate.mutate({
                timer: countdown,
                draft_id: router.query.draftID,
                isContinuingCooldown: true,
                isPauseTimer: false,
              });
            }

            if (countdown <= 0) {
              clearInterval(interval);
            }
          }, 1000);
        }
      }
    });

    return () => {
      arenaChannel.unbind();
      draftChannel.unbind();
      timerChannel.unbind();
      pusherClient.unsubscribe(arenaChannel.name);
      pusherClient.unsubscribe(draftChannel.name);
      pusherClient.unsubscribe(timerChannel.name);
      clearInterval(interval);
    };
  }, [router, state.user]);

  const draftDataQuery = useQuery({
    queryKey: ["draftData", router.query.draftID],
    queryFn: async () => {
      const listResponse = await api.post("/arena/draft/get", {
        arena_id: router.query.draftID,
      });
      return listResponse.data;
    },
    onSuccess: (data) => {
      setTimer(data.result.timer);
      setPlayer1Info({
        id: data.result.player1.id,
        avatar: data.result.player1.avatar,
        username: data.result.player1.username,
      });
      setPlayer2Info({
        id: data.result.player2.id,
        avatar: data.result.player2.avatar,
        username: data.result.player2.username,
      });

      let pickList: DraftInfoProps[] = [],
        banList: DraftInfoProps[] = [];

      data.result.CharacterDraft.map((i: DraftInfoProps) => {
        if (i.status === "pick") {
          pickList.push(i);
        } else {
          banList.push(i);
        }
      });
      if (data.result.bossID !== "" || data.result.bossID !== null) {
        setBossInfo(data.result.boss);
      }
      setPickList(pickList, data.result.arena.mode);
      setBanList(banList, data.result.arena.mode);
      setSequenceList(data.result.arena.mode);
      setIsStartDraft(data.result.current_status_draft === null ? false : true);
    },
  });

  const colorConvertVision = (vision: string) => {
    return convertVisionToColor(vision);
  };

  return (
    <>
      <Head>
        <title>Drating - Endgame</title>
        <meta name="description" content="Endgame Drafting" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {state.user.role == "Drafter" && (
        <CharacterDraft
          statusCharacterModal={applyCharacterModal}
          onCloseCharacterModal={onToggleCharacterPickModal}
        />
      )}

      <ModalBoss
        isOpen={applyBossModal}
        onClose={onToggleBossRevealModal}
        onAccept={onAcceptRerollBoss}
        onDecline={onDeclineRerollBoss}
        boss={"AeonBlight"}
        timer={10}
      />

      <ModalCharacterPickBlur
        ischaractermodalactive={applyCharacterModal.toString()}
      >
        {state.user.id !== "" && (
          <BackgroundVid
            mp4={state.settings.video_bg.mp4}
            webm={state.settings.video_bg.webm}
          />
        )}

        <DraftHeader
          statusCharacterModal={applyCharacterModal}
          onOpenCharacterModal={onToggleCharacterPickModal}
          setBackgroundVid={setBackgroundVid}
          state={state}
          router={router}
          ban={ban}
          banWidth={banWidthSize}
          boss={boss}
        />

        {draftDataQuery.isLoading !== true && (
          <Container maxW="1275px" pt={4} height="calc(100vh - 115px)">
            <VStack w="100%" h="100%" justifyContent="space-between">
              <DraftCountdown
                timer={timer}
                player1IsReroll=""
                player2IsReroll=""
              />
              <Flex flex={1} w="100%" height="100%" alignItems="center">
                <VStack
                  w="100%"
                  gap={1}
                  height="525px"
                  justifyContent="center"
                  position="relative"
                  zIndex="15"
                >
                  {pick?.map((pickData: DraftInfoProps[], i: number) => (
                    <DraftPickBanner
                      aligndraft="left"
                      currentpickdraft="false"
                      key={i}
                    >
                      <DraftPickBannerWrapper>
                        {pickData.map(
                          (pickDataSide: DraftInfoProps, ii: number) => (
                            <DraftCharacterPickBanner
                              aligndraft={ii === 0 ? "left" : "right"}
                              colorcharacter=""
                              key={ii}
                            >
                              <motion.div
                                key={pickDataSide.characterID}
                                initial={{
                                  width: "0%",
                                }}
                                animate={{
                                  width: "100%",
                                  transition: { duration: 0.5 },
                                }}
                                style={{
                                  height: "100%",
                                  backgroundColor:
                                    pickDataSide.characterID !== null
                                      ? colorConvertVision(
                                          pickDataSide.character.vision
                                        )
                                      : "",
                                }}
                              >
                                <DraftCharacterContainer
                                  aligndraft={ii === 0 ? "left" : "right"}
                                >
                                  {pickDataSide.characterID !== null && (
                                    <>
                                      <motion.div
                                        key={
                                          pickDataSide.character.pick_picture
                                        }
                                        initial={{
                                          y: -20,
                                          opacity: 0,
                                        }}
                                        animate={{
                                          y: 0,
                                          opacity: 1,
                                          transition: {
                                            delay: 0.65,
                                            duration: 0.5,
                                          },
                                        }}
                                        style={{
                                          width: "100%",
                                          height: "100%",
                                        }}
                                      >
                                        <Image
                                          src={
                                            pickDataSide.character.pick_picture
                                          }
                                          h="100%"
                                          className="character-img-pick"
                                        />
                                      </motion.div>
                                      <motion.div
                                        key={pickDataSide.character.vision}
                                        initial={{
                                          y: -20,
                                          opacity: 0,
                                        }}
                                        animate={{
                                          y: 0,
                                          opacity: 1,
                                          transition: {
                                            delay: 0.85,
                                            duration: 0.5,
                                          },
                                        }}
                                        style={{
                                          height: "100%",
                                        }}
                                      >
                                        <Box className="character-vision-icon">
                                          {pickDataSide.character.vision ===
                                            "anemo" && <AnemoVisionIcon />}
                                          {pickDataSide.character.vision ===
                                            "cryo" && <CryoVisionIcon />}
                                          {pickDataSide.character.vision ===
                                            "dendro" && <DendroVisionIcon />}
                                          {pickDataSide.character.vision ===
                                            "electro" && <ElectroVisionIcon />}
                                          {pickDataSide.character.vision ===
                                            "geo" && <GeoVisionIcon />}
                                          {pickDataSide.character.vision ===
                                            "hydro" && <HydroVisionIcon />}
                                          {pickDataSide.character.vision ===
                                            "pyro" && <PyroVisionIcon />}
                                        </Box>
                                      </motion.div>

                                      <DraftCharacterNameWrapper className="character-name-wrapper">
                                        <DraftCharacterName>
                                          {pickDataSide.character.name}
                                        </DraftCharacterName>
                                      </DraftCharacterNameWrapper>
                                    </>
                                  )}
                                </DraftCharacterContainer>
                              </motion.div>
                            </DraftCharacterPickBanner>
                          )
                        )}
                      </DraftPickBannerWrapper>
                    </DraftPickBanner>
                  ))}

                  <DraftBossCard>
                    <Box
                      position="relative"
                      zIndex="25"
                      w="100%"
                      h="100%"
                      cursor="pointer"
                      onClick={() => {
                        // if (state.user.role === "GM") {
                        //   timerUpdate.mutate({
                        //     timer: 10,
                        //     draft_id: router.query.draftID,
                        //     isContinuingCooldown: false,
                        //     isPauseTimer: false,
                        //   });
                        // } else {
                        //   timerUpdate.mutate({
                        //     timer: timer,
                        //     draft_id: router.query.draftID,
                        //     isContinuingCooldown: false,
                        //     isPauseTimer: true,
                        //   });
                        // }
                      }}
                    >
                      <DraftBossCardBGImg
                        src={isStartDraft === true ? WarpImgGIF : WarpImgPNG}
                      />
                      <Box position="relative" zIndex="50">
                        {/* <Image
                          src="https://endgame.otakuhobbitoysph.com/cdn/characters/flash/Keqing.png"
                          alt="placements-flash"
                          width="100%"
                        /> */}
                      </Box>
                    </Box>
                  </DraftBossCard>
                </VStack>
              </Flex>
              <Flex
                flex={1}
                w="100%"
                alignItems="flex-end"
                mb="-15px !important"
              >
                <DraftFooter
                  player1Name={player1.username}
                  player2Name={player2.username}
                />
              </Flex>
            </VStack>
          </Container>
        )}
      </ModalCharacterPickBlur>
    </>
  );
};
export default Drafting;
