import BackgroundVid from "@/components/BackgroundVid";
import CharacterDraft from "@/components/CharacterDraft";
import DraftCountdown from "@/components/DraftCountdown";
import DraftFooter from "@/components/DraftFooter";
import DraftHeader from "@/components/DraftHeader";
import { ModalBoss } from "@/libs/helpers/types";
import { vision } from "@/libs/includes/color";
import { WarpImgPNG, WarpImgGIF } from "@/libs/includes/image";
import { useUserData } from "@/libs/providers/UserContext";
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

import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
  const { state } = useUserData();
  const router = useRouter();

  const [applyCharacterModal, setApplyCharacterModal] =
    useState<boolean>(false);
  const [applyBossModal, setApplyBossModal] = useState<boolean>(false);
  const [isStartDraft, setIsStartDraft] = useState<boolean>(false);

  const onToggleCharacterPickModal = () => {
    setApplyCharacterModal(!applyCharacterModal);
  };

  const onToggleBossRevealModal = () => {
    setApplyBossModal(!applyBossModal);
  };

  const onAcceptRerollBoss = () => {};

  const onDeclineRerollBoss = () => {};

  useEffect(() => {}, [router]);

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
          state={state}
          router={router}
        />

        <Container maxW="1275px" pt={4} height="calc(100vh - 115px)">
          <VStack w="100%" h="100%" justifyContent="space-between">
            <DraftCountdown />
            <Flex flex={1} w="100%" height="100%" alignItems="center">
              <VStack
                w="100%"
                gap={1}
                height="525px"
                justifyContent="center"
                position="relative"
                zIndex="15"
              >
                <DraftPickBanner aligndraft="left" currentpickdraft="false">
                  <DraftPickBannerWrapper>
                    <DraftCharacterPickBanner
                      aligndraft="left"
                      colorcharacter={vision["pyro"].color}
                    >
                      <DraftCharacterContainer aligndraft="left">
                        <Image
                          src="https://endgame.otakuhobbitoysph.com/cdn/characters/pick/Klee.png"
                          h="100%"
                          className="character-img-pick"
                        />
                        <Box className="character-vision-icon">
                          {vision["pyro"].logoSrc}
                        </Box>
                        <DraftCharacterNameWrapper className="character-name-wrapper">
                          <DraftCharacterName>Klee</DraftCharacterName>
                        </DraftCharacterNameWrapper>
                      </DraftCharacterContainer>
                    </DraftCharacterPickBanner>
                    <DraftCharacterPickBanner
                      aligndraft="right"
                      colorcharacter=""
                    >
                      <DraftCharacterContainer aligndraft="right"></DraftCharacterContainer>
                    </DraftCharacterPickBanner>
                  </DraftPickBannerWrapper>
                </DraftPickBanner>

                <DraftPickBanner aligndraft="left" currentpickdraft="false">
                  <DraftPickBannerWrapper>
                    <DraftCharacterPickBanner
                      aligndraft="left"
                      colorcharacter=""
                    >
                      <DraftCharacterContainer aligndraft="left"></DraftCharacterContainer>
                    </DraftCharacterPickBanner>
                    <DraftCharacterPickBanner
                      aligndraft="right"
                      colorcharacter=""
                    >
                      <DraftCharacterContainer aligndraft="right"></DraftCharacterContainer>
                    </DraftCharacterPickBanner>
                  </DraftPickBannerWrapper>
                </DraftPickBanner>

                <DraftPickBanner aligndraft="left" currentpickdraft="false">
                  <DraftPickBannerWrapper>
                    <DraftCharacterPickBanner
                      aligndraft="left"
                      colorcharacter=""
                    >
                      <DraftCharacterContainer aligndraft="left"></DraftCharacterContainer>
                    </DraftCharacterPickBanner>
                    <DraftCharacterPickBanner
                      aligndraft="right"
                      colorcharacter=""
                    >
                      <DraftCharacterContainer aligndraft="right"></DraftCharacterContainer>
                    </DraftCharacterPickBanner>
                  </DraftPickBannerWrapper>
                </DraftPickBanner>

                <DraftPickBanner aligndraft="left" currentpickdraft="false">
                  <DraftPickBannerWrapper>
                    <DraftCharacterPickBanner
                      aligndraft="left"
                      colorcharacter=""
                    >
                      <DraftCharacterContainer aligndraft="left"></DraftCharacterContainer>
                    </DraftCharacterPickBanner>
                    <DraftCharacterPickBanner
                      aligndraft="right"
                      colorcharacter=""
                    >
                      <DraftCharacterContainer aligndraft="right"></DraftCharacterContainer>
                    </DraftCharacterPickBanner>
                  </DraftPickBannerWrapper>
                </DraftPickBanner>

                <DraftBossCard>
                  <Box position="relative" zIndex="25" w="100%" h="100%">
                    <DraftBossCardBGImg
                      src={isStartDraft === true ? WarpImgGIF : WarpImgPNG}
                    />

                    {/* <Box position="relative" zIndex="50">
                      <Image
                        src="https://endgame.otakuhobbitoysph.com/cdn/characters/flash/Keqing.png"
                        alt="placements-flash"
                        width="100%"
                      />
                    </Box> */}
                  </Box>
                </DraftBossCard>
              </VStack>
            </Flex>
            <Flex flex={1} w="100%" alignItems="flex-end" mb="-15px !important">
              <DraftFooter />
            </Flex>
          </VStack>
        </Container>
      </ModalCharacterPickBlur>
    </>
  );
};
export default Drafting;
