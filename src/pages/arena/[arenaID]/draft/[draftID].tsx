import BackgroundVid from "@/components/BackgroundVid";
import CharacterDraft from "@/components/CharacterDraft";
import DraftCountdown from "@/components/DraftCountdown";
import DraftFooter from "@/components/DraftFooter";
import DraftHeader from "@/components/DraftHeader";
import Head from "next/head";
import { useMutation, useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
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
import {
  banIndexListPlayer1,
  banIndexListPlayer2,
  findCharacterByCharacterID,
  getSequenceByIndex,
  inArray,
  pickIndexListPlayer1,
  pickIndexListPlayer2,
} from "@/libs/providers/draft";
import { timerStore } from "@/libs/store/timer";

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
  isDoneChooseReroll,
  setIsDoneChooseReroll,
}: ModalBoss) => {
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
    currentCharacterChoose,
    setIsDoneChooseCharacter,
    setCurrentCharacterChoice,
    banListCharacterDraft,
    pickListCharacterDraft,
    updateBanDraftCharacters,
    updatePickDraftCharacters,
    mode,
    setMode,
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
    state.currentCharacterChoose,
    state.setIsDoneChooseCharacter,
    state.setCurrentCharacterChoice,
    state.banListCharacterDraft,
    state.pickListCharacterDraft,
    state.updateBanDraftCharacters,
    state.updatePickDraftCharacters,
    state.mode,
    state.setMode,
  ]);

  const [
    timer,
    setTimer,
    isPauseTimer,
    setIsPause,
    isDoneChooseReroll,
    setIsDoneChooseReroll,
  ] = timerStore((state) => [
    state.timer,
    state.setTimer,
    state.isPauseTimer,
    state.setIsPause,
    state.isDoneChooseReroll,
    state.setIsDoneChooseReroll,
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
        draft_id: router.query.draftID,
      });
      return listResponse.data;
    },
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setTimer(data.result.timer);
      setIsPause(true);
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
      setMode(data.result.arena.mode);
      setIsDoneChooseReroll(false);

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
      for (const character of data) {
        character.isPicked = false;
      }
      setCharacterDraftListUpdate(characterDraft, data);
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

  const startDraft = useMutation({
    mutationFn: async (data: any) => {
      let submitResponse = await api.post("/arena/draft/start", data);
      return submitResponse.data;
    },
  });

  useEffect(() => {
    const timerChannel = pusherClient.subscribe("draft_timer");

    timerChannel.bind(`timerDraft_${router.query.draftID}`, (data: any) => {
      let countdown = data.timer;
      setTimer(countdown);

      if (data.isPauseTimer === true) {
        setIsPause(true);
      } else {
        setIsPause(false);
      }

      if (
        data.draftSituation === "characterDraft" &&
        state.user.role === "GM" &&
        countdown <= 0
      ) {
        setTimeout(() => {
          draftSequence.mutate({
            draft_id: router.query.draftID,
            function: `characterDraft_${router.query.draftID}`,
            type: "character_draft",
            sequence: sequenceIndex === 0 ? sequence[0] : currentSequence,
            sequenceIndex: sequenceIndex + 1,
            isStartingDraft: false,
            characterID: "",
          });
        }, 1000);
      }
    });

    return () => {
      timerChannel.unbind();
      pusherClient.unsubscribe(timerChannel.name);
    };
  }, [router, state.user, currentSequence, sequence]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (!isPauseTimer) {
      if (state.user.role === "GM") {
        intervalId = setInterval(() => {
          let countdown: number = timer - 1;
          if (countdown < 0) {
            clearInterval(intervalId);
            setIsPause(false);
          } else {
            timerUpdate.mutate({
              timer: countdown,
              function: `timerDraft_${router.query.draftID}`,
              draft_id: router.query.draftID,
              isContinuingCooldown: false,
              isPauseTimer: false,
              draftSituation: draftSituation,
            });
          }
        }, 1000);
      }
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [timer, isPauseTimer, state.user, draftSituation]);

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
            draftSituation: "initBoss",
          });
        }
      }, 3000);
    });

    draftChannel.bind(`player_reroll_${router.query.draftID}`, (data: any) => {
      if (data.player_position === "player1") {
        setPlayer1Reroll(data.playerReroll);
      } else {
        setPlayer2Reroll(data.playerReroll);
      }
    });

    draftChannel.bind(`characterDraft_${router.query.draftID}`, (data: any) => {
      setDraftSituation("characterDraft");
      if (data.sequence !== null) {
        setCurrentSequence(data.sequence);
        setSequenceIndex(data.sequenceIndex);
      }

      setCurrentCharacterChoice({
        id: "",
        name: "",
        display_name: "",
        rarity: "",
        vision: "",
        weapon: "",
        draft_picture: "",
        pick_picture: "",
        flash_picture: "",
        ban_picture: "",
        ban_audio: "",
        pick_audio: "",
        is_visible: true,
        nation: "",
      });

      if (data.isStartingDraft === false) {
        if (data.characterID !== "") {
          setCharacterListAfterUpdate(data.characterID, characters);

          let characterInfo = findCharacterByCharacterID(
            data.characterID,
            characters
          );
          if (characterInfo) {
            setCurrentCharacterFlash(characterInfo.flash_picture);
            let characterChooseAudio = null;

            if (data.sequence !== null) {
              if (
                inArray(sequence[sequenceIndex].index, banIndexListPlayer1) ||
                inArray(sequence[sequenceIndex].index, banIndexListPlayer2)
              ) {
                updateBanDraftCharacters(
                  data.characterID,
                  sequence[sequenceIndex].index,
                  characterInfo,
                  ban,
                  banListCharacterDraft
                );
                characterChooseAudio = new Howl({
                  src: [characterInfo.ban_audio],
                });
              }
              if (
                inArray(sequence[sequenceIndex].index, pickIndexListPlayer1) ||
                inArray(sequence[sequenceIndex].index, pickIndexListPlayer2)
              ) {
                updatePickDraftCharacters(
                  data.characterID,
                  sequence[sequenceIndex].index,
                  characterInfo,
                  pick,
                  pickListCharacterDraft
                );
                characterChooseAudio = new Howl({
                  src: [characterInfo.pick_audio],
                });
              }
              if (state.user.role === "GM" && characterChooseAudio !== null) {
                characterChooseAudio.play();
              }
            } else {
              updatePickDraftCharacters(
                data.characterID,
                sequence[sequence.length - 1].index,
                characterInfo,
                pick,
                pickListCharacterDraft
              );
              characterChooseAudio = new Howl({
                src: [characterInfo.pick_audio],
              });
              if (state.user.role === "GM" && characterChooseAudio !== null) {
                characterChooseAudio.play();
              }
            }
          }
        }
        setTimeout(() => {
          setCurrentCharacterFlash("");
          if (data.sequence !== null) {
            let characterAnnounce = new Howl({
              src: [`/audio/${data.sequence.audio}.wav`],
            });
            characterAnnounce.play();

            if (state.user.role === "GM") {
              timerUpdate.mutate({
                timer: 30,
                function: `timerDraft_${router.query.draftID}`,
                draft_id: router.query.draftID,
                isContinuingCooldown: false,
                isPauseTimer: false,
                draftSituation: draftSituation,
              });
            }
          }

          setIsDoneChooseCharacter(false);
        }, 3500);
      } else {
        let characterAnnounce = new Howl({
          src: [`/audio/${data.sequence.audio}.wav`],
        });
        characterAnnounce.play();
        setIsStartDraft(true);
      }
    });

    draftChannel.bind(`restart_draft${router.query.draftID}`, (data: any) => {
      router.push(`/arena/${data.arena_id}/draft/${data.draft_id}`);
    });
    draftChannel.bind(
      `switch_layer_draft${router.query.draftID}`,
      (data: any) => {
        router.push(`/arena/${data.arena_id}/draft/${data.draft_id}`);
      }
    );

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

          if (state.user.role === "GM") {
            draftSequence.mutate({
              draft_id: router.query.draftID,
              function: `characterDraft_${router.query.draftID}`,
              type: "character_draft",
              sequence: sequence[sequenceIndex],
              sequenceIndex: 0,
              isStartingDraft: true,
            });
            setDraftSituation("characterDraft");

            timerUpdate.mutate({
              timer: 30,
              function: `timerDraft_${router.query.draftID}`,
              draft_id: router.query.draftID,
              isContinuingCooldown: false,
              isPauseTimer: false,
              draftSituation: "characterDraft",
            });
          }
        }, 4000);
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

            if (state.user.role === "GM") {
              draftSequence.mutate({
                draft_id: router.query.draftID,
                function: `characterDraft_${router.query.draftID}`,
                type: "character_draft",
                sequence: sequence[sequenceIndex],
                sequenceIndex: 0,
                isStartingDraft: true,
              });

              setDraftSituation("characterDraft");

              timerUpdate.mutate({
                timer: 30,
                function: `timerDraft_${router.query.draftID}`,
                draft_id: router.query.draftID,
                isContinuingCooldown: false,
                isPauseTimer: false,
                draftSituation: "characterDraft",
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

  const onCharacterDraftChoose = () => {
    timerUpdate.mutate({
      timer: timer,
      function: `timerDraft_${router.query.draftID}`,
      draft_id: router.query.draftID,
      isContinuingCooldown: false,
      isPauseTimer: true,
      draftSituation: draftSituation,
    });

    draftSequence.mutate({
      draft_id: router.query.draftID,
      function: `characterDraft_${router.query.draftID}`,
      type: "character_draft",
      sequence: currentSequence,
      sequenceIndex: sequenceIndex + 1,
      isStartingDraft: false,
      characterID: currentCharacterChoose.id,
    });
  };

  const colorConvertVision = (vision: string) => {
    return convertVisionToColor(vision);
  };

  const acceptRestartDraft = () => {
    startDraft.mutate({
      mode: mode,
      arenaID: router.query.arenaID,
      player1: player1.id,
      player2: player2.id,
      boss_id: null,
      function: `restart_draft${router.query.draftID}`,
      type: "start_drafting",
    });
  };
  const acceptSwitchPlayersDraft = () => {
    console.log({
      player1: player2,
      player2: player1,
    });
    startDraft.mutate({
      mode: mode,
      arenaID: router.query.arenaID,
      player1: player2.id,
      player2: player1.id,
      boss_id: null,
      function: `switch_layer_draft${router.query.draftID}`,
      type: "switch_drafting",
    });
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
        isDoneChooseReroll={isDoneChooseReroll}
        setIsDoneChooseReroll={setIsDoneChooseReroll}
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
          onAcceptRestartDraft={acceptRestartDraft}
          onAcceptSwitchPlayersDraft={acceptSwitchPlayersDraft}
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
                                  timerUpdate.mutate({
                                    timer: 30,
                                    function: `timerDraft_${router.query.draftID}`,
                                    draft_id: router.query.draftID,
                                    isContinuingCooldown: false,
                                    isPauseTimer: false,
                                    draftSituation: "characterDraft",
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
