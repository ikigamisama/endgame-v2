import { NextPage } from "next";
import { useRouter } from "next/router";
import { useUserData } from "@/libs/providers/UserContext";
import Head from "next/head";
import dynamic from "next/dynamic";
import { socket } from "@/libs/providers/socket";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/libs/providers/api";
import { useDraftStore } from "@/libs/store/draft";
import { timerStore } from "@/libs/store/timer";
import { useEffect } from "react";
import {
  CharacterDraftPayloadProps,
  DraftInfoProps,
} from "@/libs/helpers/types";
import { getSequenceByIndex } from "@/libs/providers/draft";
import { Container, Flex, VStack } from "@chakra-ui/react";
import DraftCountdown from "@/components/DraftCountdown";
import DraftFooter from "@/components/DraftFooter";
import {
  SpiralAbyssCard,
  SpiralAbyssCardWrapper,
} from "@/src/styles/SpiralAbyss";

const BackgroundVid = dynamic(() => import("@/components/BackgroundVid"), {
  ssr: false,
});

const HeaderSpiralAbyss = dynamic(
  () => import("@/components/spiral_abyss/Header"),
  {
    ssr: false,
  }
);

const SpiralAbyssDraft: NextPage = () => {
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
    winnerButton,
    setWinnerButton,
    setCharactersList,
    isGMDoneDeclareWinner,
    setIsGMDoneDeclareWinner,
    gameType,
    setGameType,
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
    state.winnerButton,
    state.setWinnerButton,
    state.setCharactersList,
    state.isGMDoneDeclareWinner,
    state.setIsGMDoneDeclareWinner,
    state.gameType,
    state.setGameType,
  ]);

  const [
    timer,
    setTimer,
    isPauseTimer,
    setIsPause,
    isDoneChooseReroll,
    setIsDoneChooseReroll,
    isPopupWinnerModal,
    setPopupModalWinner,
    isPauseCharacterDraft,
    setIsPauseCharacterDraft,
  ] = timerStore((state) => [
    state.timer,
    state.setTimer,
    state.isPauseTimer,
    state.setIsPause,
    state.isDoneChooseReroll,
    state.setIsDoneChooseReroll,
    state.isPopupWinnerModal,
    state.setPopupModalWinner,
    state.isPauseCharacterDraft,
    state.setIsPauseCharacterDraft,
  ]);

  const startDraftAbyss = useMutation({
    mutationFn: async (data: any) => {
      let submitResponse = await api.post("/arena/draft/start", data);
      return submitResponse.data;
    },
    onSuccess: (data) => {
      socket.emit("redraft", data.socket);
    },
  });

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
      setPlayer1Info({
        id: "12766a0e-8c72-4f39-9a74-1298c1a37264",
        avatar: "https://api.dicebear.com/6.x/adventurer/svg?seed=Cookie",
        username: "Lodicakes",
      });
      setPlayer2Info({
        id: "30964fb5-469b-4f2e-8694-2ed29f4fe47b",
        avatar: "https://api.dicebear.com/6.x/adventurer/svg?seed=Dusty",
        username: "OhGeorge",
      });
    },
  });

  useEffect(() => {
    const restartDraft = (data: any) => {
      router.push(
        `/arena/${data.arena_id}/draft/${gameType.toLowerCase()}/${
          data.draft_id
        }`
      );
    };
    socket.on(`restart_draft_${router.query.draftID}`, restartDraft);
    socket.on(`switch_layer_draft_${router.query.draftID}`, restartDraft);

    return () => {
      socket.off(`restart_draft_${router.query.draftID}`, restartDraft);
      socket.off(`switch_layer_draft_${router.query.draftID}`, restartDraft);
    };
  }, [router, state.user, timer, sequence, currentSequence]);

  const acceptRestartDraft = () => {
    // startDraftAbyss.mutate({
    // });
  };
  const acceptSwitchPlayersDraft = () => {};

  const onToggleCharacterPickModal = () => {
    setApplyCharacterModal(!applyCharacterModal);
  };

  return (
    <>
      <Head>
        <title>Drating - Spiral Abyss - Endgame</title>
        <meta name="description" content="Endgame Drafting" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {state.user.id !== "" && (
        <BackgroundVid
          mp4={state.settings.video_bg.mp4}
          webm={state.settings.video_bg.webm}
        />
      )}

      <HeaderSpiralAbyss
        onAcceptRestartDraft={acceptRestartDraft}
        onAcceptSwitchPlayersDraft={acceptSwitchPlayersDraft}
        onOpenCharacterModal={onToggleCharacterPickModal}
        state={state}
        socket={socket}
        router={router}
        winnerButton={winnerButton}
        setPopupModalWinner={setPopupModalWinner}
        setBackgroundVid={setBackgroundVid}
        isGMDoneDeclareWinner={isGMDoneDeclareWinner}
      />

      <Container maxW="1275px" pt={4} height="calc(100vh - 100px)">
        <VStack w="100%" h="100%" justifyContent="space-between">
          <DraftCountdown
            timer={timer}
            player1IsReroll={player1_reroll}
            player2IsReroll={player2_reroll}
          />
          <SpiralAbyssCard>
            <SpiralAbyssCardWrapper></SpiralAbyssCardWrapper>
          </SpiralAbyssCard>

          <Flex flex={1} w="100%" alignItems="flex-end" mb="-15px !important">
            <DraftFooter
              player1Name={player1.username}
              player2Name={player2.username}
            />
          </Flex>
        </VStack>
      </Container>
    </>
  );
};
export default SpiralAbyssDraft;
