import BackgroundVid from "@/components/BackgroundVid";
import CharacterDraft from "@/components/CharacterDraft";
import DraftCountdown from "@/components/DraftCountdown";
import DraftFooter from "@/components/DraftFooter";
import DraftHeader from "@/components/DraftHeader";
import Head from "next/head";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Howl } from "howler";
import { convertVisionToColor } from "@/libs/includes/color";
import { WarpImgPNG, WarpImgGIF, BossImageRandom } from "@/libs/includes/image";
import { useUserData } from "@/libs/providers/UserContext";
import { api } from "@/libs/providers/api";
import { pusherClient } from "@/libs/providers/pusherClient";
import { useDraftStore } from "@/libs/store/draft";
import { ModalCharacterPickBlur } from "@/src/styles/CharacterPick";
import { EndgameModalContent, EndgameModalWrapper } from "@/src/styles/Modal";
import {
  CharacterDraftPayloadProps,
  CharacterInfoProps,
  DraftInfoProps,
  ModalBoss,
  TimerUpdateProps,
} from "@/libs/helpers/types";

import {
  AnemoVisionIcon,
  CryoVisionIcon,
  DendroVisionIcon,
  ElectroVisionIcon,
  GeoVisionIcon,
  HydroVisionIcon,
  PyroVisionIcon,
  StartIcon,
} from "@/libs/includes/icons";

import {
  BossChooseText,
  BossChooseWrapper,
  BossModalButtons,
  DraftBossCard,
  DraftBossCardBGImg,
  DraftButtonStart,
  DraftCharacterContainer,
  DraftCharacterName,
  DraftCharacterNameWrapper,
  DraftCharacterPickBanner,
  DraftPickBanner,
  DraftPickBannerWrapper,
} from "@/src/styles/Draft";

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
import { getSequenceByIndex, updateCharacters } from "@/libs/providers/draft";

const ModalBoss = ({
  isOpen,
  onClose,
  onAccept,
  onDecline,
  boss,
  timer,
  user_state,
  player1,
  player2,
}: ModalBoss) => {
  const [isDoneChooseReroll, setIsDoneChooseReroll] = useState<boolean>(false);
  return (
    <Modal
      onClose={onClose}
      size="3xl"
      isOpen={isOpen}
      motionPreset="slideInBottom"
      isCentered
      closeOnOverlayClick={false}
    >
      <ModalOverlay />

      <EndgameModalContent>
        <EndgameModalWrapper>
          <ModalBody p={10}>
            <Center>
              <BossChooseWrapper>
                <Img src={boss !== null ? boss.picture : ""} width="100%" />
              </BossChooseWrapper>
            </Center>
            <BossChooseText fontSize="2.5rem" mb={8}>
              {boss !== null ? boss.name : ""} is selected randomly. Reroll ?
            </BossChooseText>

            {isDoneChooseReroll === false && (
              <SimpleGrid columns={2} spacing={8} mb={8}>
                <BossModalButtons
                  onClick={(e) => {
                    e.preventDefault();
                    setIsDoneChooseReroll(true);
                    onAccept(
                      user_state.id,
                      player1.id === user_state.id
                        ? "player1"
                        : player2.id === user_state.id
                        ? "player2"
                        : ""
                    );
                  }}
                >
                  Reroll
                </BossModalButtons>
                <BossModalButtons
                  onClick={(e) => {
                    e.preventDefault();
                    setIsDoneChooseReroll(true);
                    onDecline(
                      user_state.id,
                      player1.id === user_state.id
                        ? "player1"
                        : player2.id === user_state.id
                        ? "player2"
                        : ""
                    );
                  }}
                >
                  No Reroll
                </BossModalButtons>
              </SimpleGrid>
            )}

            <BossChooseText fontSize="1.25rem">
              Automatically declare No Reroll after {timer} seconds
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
  const queryclient = useQueryClient();

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
    currentSequence,
    setCurrentSequence,
    currentCharacterFlash,
    setCurrentCharacterFlash,
    currentBossFlash,
    setCurrentBossFlash,
    player1_reroll,
    player2_reroll,
    draftSituation,
    setDraftSituation,
    setPlayer1Reroll,
    setPlayer2Reroll,
    isReroll,
    setIsReroll,
    sequenceIndex,
    setSequenceIndex,
    characterDraft,
    characters,
    setCharacterDraftList,
    setCharacterDraftListUpdate,
    setCharacterListAfterUpdate,
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
    state.currentSequence,
    state.setCurrentSequence,
    state.currentCharacterFlash,
    state.setCurrentCharacterFlash,
    state.currentBossFlash,
    state.setCurrentBossFlash,
    state.player1_reroll,
    state.player2_reroll,
    state.draftSituation,
    state.setDraftSituation,
    state.setPlayer1Reroll,
    state.setPlayer2Reroll,
    state.isReroll,
    state.setIsReroll,
    state.sequenceIndex,
    state.setSequenceIndex,
    state.characterDraft,
    state.characters,
    state.setCharacterDraftList,
    state.setCharacterDraftListUpdate,
    state.setCharacterListAfterUpdate,
  ]);

  const onToggleCharacterPickModal = () => {
    setApplyCharacterModal(!applyCharacterModal);
  };

  const onToggleBossRevealModal = () => {
    setApplyBossModal(!applyBossModal);
  };

  const draftDataQuery = useQuery({
    queryKey: ["draftData", router.query.draftID],
    queryFn: async () => {
      const listResponse = await api.post("/arena/draft/get", {
        arena_id: router.query.draftID,
      });
      return listResponse.data;
    },
    refetchOnWindowFocus: false,
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

      setIsStartDraft(data.result.current_status_draft === null ? false : true);

      let pickList: DraftInfoProps[] = [],
        banList: DraftInfoProps[] = [],
        characterDraft: CharacterDraftPayloadProps[] = [];

      data.result.CharacterDraft.map((i: DraftInfoProps) => {
        if (i.status === "pick") {
          pickList.push(i);
        } else {
          banList.push(i);
        }
        const characterDraftInfo: CharacterDraftPayloadProps = {
          draftID: i.draftID,
          index: i.index,
          playerID: i.playerID || "",
          status: i.status,
          characterID: i.characterID || "",
        };

        characterDraft.push(characterDraftInfo);
      });
      setCharacterDraftList(characterDraft);
      setPickList(pickList, data.result.arena.mode);
      setBanList(banList, data.result.arena.mode);
      setSequenceList(JSON.parse(data.result.sequence));

      if (data.result.bossID !== "" || data.result.bossID !== null) {
        setBossInfo(data.result.boss);
      }

      if (
        data.result.current_status_draft !== null ||
        data.result.current_status_draft !== "init"
      ) {
        let credatedSequence = getSequenceByIndex(
          data.result.current_status_draft,
          JSON.parse(data.result.sequence)
        );
        setCurrentSequence(credatedSequence);
      }
    },
  });

  const characterListQuery = useQuery({
    queryFn: async () => {
      const listResponse = await api.post("/characters/list", {
        page: "Character List",
      });
      return listResponse.data.list;
    },
    queryKey: ["characterDraftList", router.query.draftID],
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      if (state.user.role === "Drafter") {
        for (const character of data) {
          character.isPicked = false;
        }
        setCharacterDraftListUpdate(characterDraft, data);
      }
    },
  });

  const draftSequence = useMutation({
    mutationFn: async (data: any) => {
      let submitResponse = await api.post("/arena/draft/init", data);
      return submitResponse.data;
    },
  });

  const timerUpdate = useMutation({
    mutationFn: async (data: TimerUpdateProps) => {
      let submitResponse = await api.post("/arena/draft/timer", data);
      return submitResponse.data;
    },
  });

  useEffect(() => {
    const timerChannel = pusherClient.subscribe("draft_timer");
    let interval: NodeJS.Timeout;

    timerChannel.bind(`timerDraft_${router.query.draftID}`, (data: any) => {
      let countdown = data.timer;
      setTimer(countdown);

      if (data.isPauseTimer) {
        clearInterval(interval);
      } else {
        interval = setInterval(() => {
          countdown--;
          setTimer(countdown);

          if (state.user.role === "GM" && countdown >= 0) {
            timerUpdate.mutate({
              timer: countdown,
              function: `timerDraft_${router.query.draftID}`,
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
    });

    return () => {
      timerChannel.unbind();
      pusherClient.unsubscribe(timerChannel.name);
    };
  }, [router]);

  useEffect(() => {
    const arenaChannel = pusherClient.subscribe("arena-room"),
      draftChannel = pusherClient.subscribe("drafting");

    arenaChannel.bind("back-arena", (data: any) => {
      if (router.query.draftID === data.draftID) {
        router.push(`/arena/${data.arenaID}`);
      }
    });

    draftChannel.bind(`initDraft_${router.query.draftID}`, (data: any) => {
      setIsStartDraft(true);
      setIsReroll(data.isReroll);
      let draftDrumRollBoss = new Howl({
        src: ["/audio/randomroll.wav"],
      });
      draftDrumRollBoss.play();
      setCurrentBossFlash(BossImageRandom);
      setTimeout(() => {
        let draftDrumRollBoss = new Howl({
          src: ["/audio/bosspick.wav"],
        });
        draftDrumRollBoss.play();
        setCurrentBossFlash(data.boss.picture_choose);
        setBossInfo(data.boss);
        setDraftSituation("initBoss");
        if (state.user.role === "Drafter" && data.isReroll === false) {
          setApplyBossModal(true);
        }
        if (state.user.role === "GM" && data.isReroll === false) {
          timerUpdate.mutate({
            timer: 10,
            function: `timerDraft_${router.query.draftID}`,
            draft_id: router.query.draftID,
            isContinuingCooldown: false,
            isPauseTimer: false,
          });
        }
      }, 2500);
    });

    draftChannel.bind(`player_reroll_${router.query.draftID}`, (data: any) => {
      if (data.player_position === "player1") {
        setPlayer1Reroll(data.playerReroll);
      } else {
        setPlayer2Reroll(data.playerReroll);
      }
    });

    draftChannel.bind(`characterDraft_${router.query.draftID}`, (data: any) => {
      setCurrentSequence(data.sequence);
      setSequenceIndex(data.sequenceIndex);

      let characterAnnounce = new Howl({
        src: [`/audio/${data.sequence.audio}.wav`],
      });
      characterAnnounce.play();

      if (data.isStartingDraft === false) {
        queryclient.invalidateQueries(["draftData", data.draft_id]);
        setCharacterListAfterUpdate(data.characterID, characters);
        setCurrentCharacterFlash(data.character.flash_picture);
      } else {
        setIsStartDraft(true);
      }
    });

    return () => {
      arenaChannel.unbind();
      draftChannel.unbind();
      pusherClient.unsubscribe(arenaChannel.name);
      pusherClient.unsubscribe(draftChannel.name);
    };
  }, [router, state.user, timer]);

  useEffect(() => {
    if (timer === 0 && draftSituation == "initBoss") {
      setApplyBossModal(false);

      if (isReroll === true) {
        setTimeout(() => {
          setPlayer1Reroll(null);
          setPlayer2Reroll(null);
          setCurrentBossFlash("");
          setDraftSituation("characterDraft");
          if (state.user.role === "GM") {
            draftSequence.mutate({
              draft_id: router.query.draftID,
              function: `characterDraft_${router.query.draftID}`,
              type: "character_draft",
              sequence: sequence[sequenceIndex],
              sequenceIndex: 0,
              isStartingDraft: true,
            });
          }
        }, 5000);
      } else {
        if (player1_reroll === true && player2_reroll === true) {
          if (state.user.role === "GM") {
            draftSequence.mutate({
              draft_id: router.query.draftID,
              function: `initDraft_${router.query.draftID}`,
              type: "boss_init",
              isReroll: true,
            });
          }
        } else {
          setTimeout(() => {
            setPlayer1Reroll(null);
            setPlayer2Reroll(null);
            setCurrentBossFlash("");
            setDraftSituation("characterDraft");

            if (state.user.role === "GM") {
              draftSequence.mutate({
                draft_id: router.query.draftID,
                function: `characterDraft_${router.query.draftID}`,
                type: "character_draft",
                sequence: sequence[sequenceIndex],
                sequenceIndex: 0,
                isStartingDraft: true,
              });
            }
          }, 3000);
        }
      }
    }
  }, [
    timer,
    draftSituation,
    player1_reroll,
    player2_reroll,
    isReroll,
    state.user,
  ]);

  const onAcceptRerollBoss = (playerID: string, playerPosition: string) => {
    draftSequence.mutate({
      draft_id: router.query.draftID,
      function: `player_reroll_${router.query.draftID}`,
      type: "reroll_decisions",
      playerID: playerID,
      playerPosition: playerPosition,
      playerReroll: true,
    });
  };

  const onDeclineRerollBoss = (playerID: string, playerPosition: string) => {
    draftSequence.mutate({
      draft_id: router.query.draftID,
      function: `player_reroll_${router.query.draftID}`,
      type: "reroll_decisions",
      playerID: playerID,
      playerPosition: playerPosition,
      playerReroll: false,
    });
  };

  const onCharacterDraftChoose = () => {};

  const colorConvertVision = (vision: string) => {
    return convertVisionToColor(vision);
  };

  console.log(characters);
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
          characterListQuery={characterListQuery}
          timer={timer}
          onCharacterPick={onCharacterDraftChoose}
          state={state}
        />
      )}

      <ModalBoss
        isOpen={applyBossModal}
        onClose={onToggleBossRevealModal}
        onAccept={onAcceptRerollBoss}
        onDecline={onDeclineRerollBoss}
        boss={boss}
        timer={timer}
        user_state={state.user}
        player1={player1}
        player2={player2}
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
          colorConvertVision={colorConvertVision}
          state={state}
          router={router}
          ban={ban}
          banWidth={banWidthSize}
          boss={boss}
          currentSequence={currentSequence}
        />

        {draftDataQuery.isLoading !== true && (
          <Container maxW="1275px" pt={4} height="calc(100vh - 115px)">
            <VStack w="100%" h="100%" justifyContent="space-between">
              <DraftCountdown
                timer={timer}
                player1IsReroll={player1_reroll}
                player2IsReroll={player2_reroll}
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
                      aligndraft={
                        currentSequence.player === "player1" ? "left" : "right"
                      }
                      currentpickdraft={
                        currentSequence.index === `player-1-pick-${i + 1}` ||
                        currentSequence.index === `player-2-pick-${i + 1}`
                          ? "true"
                          : "false"
                      }
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
                                  display: "flex",
                                  justifyContent:
                                    ii === 0 ? "flex-start" : "flex-end",
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
                    >
                      <DraftBossCardBGImg
                        src={isStartDraft === true ? WarpImgGIF : WarpImgPNG}
                      />
                      <Box
                        position="relative"
                        zIndex="50"
                        w="100%"
                        height="100%"
                      >
                        {state.user.role === "GM" && isStartDraft === false ? (
                          <Center w="100%" height="100%">
                            <DraftButtonStart
                              onClick={() => {
                                if (boss !== null) {
                                  draftSequence.mutate({
                                    draft_id: router.query.draftID,
                                    function: `characterDraft_${router.query.draftID}`,
                                    type: "character_draft",
                                    sequence: sequence[sequenceIndex],
                                    sequenceIndex: 0,
                                    isStartingDraft: true,
                                  });
                                } else {
                                  draftSequence.mutate({
                                    draft_id: router.query.draftID,
                                    function: `initDraft_${router.query.draftID}`,
                                    type: "boss_init",
                                    isReroll: false,
                                  });
                                }
                              }}
                            >
                              <StartIcon />
                              Start
                            </DraftButtonStart>
                          </Center>
                        ) : null}
                        {currentCharacterFlash !== "" && (
                          <Center w="100%" height="100%">
                            <Image
                              src={currentCharacterFlash}
                              alt="placements-flash"
                              width="100%"
                              transform="scale(1)"
                            />
                          </Center>
                        )}
                        {currentBossFlash !== "" && (
                          <Center w="100%" height="100%">
                            <Image
                              src={currentBossFlash}
                              alt="placements-flash"
                              width="100%"
                              transform="scale(1)"
                            />
                          </Center>
                        )}
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
