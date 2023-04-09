import BackgroundVid from "@/components/BackgroundVid";
import DraftCountdown from "@/components/DraftCountdown";
import DraftFooter from "@/components/DraftFooter";
import DraftHeader from "@/components/DraftHeader";
import { vision } from "@/libs/includes/color";
import { WarpImg } from "@/libs/includes/image";
import { useUserData } from "@/libs/providers/UserContext";
import {
  DraftBossCard,
  DraftBossCardBGImg,
  DraftCharacterContainer,
  DraftCharacterName,
  DraftCharacterNameWrapper,
  DraftCharacterPickBanner,
  DraftPickBanner,
  DraftPickBannerWrapper,
} from "@/src/styles/Draft";
import { Box, Container, Flex, Image, VStack } from "@chakra-ui/react";

import { NextPage } from "next";
import Head from "next/head";

const Drafting: NextPage = () => {
  const { state } = useUserData();

  return (
    <>
      <Head>
        <title>Drating - Endgame</title>
        <meta name="description" content="Endgame Drafting" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BackgroundVid
        mp4={state.settings.video_bg.mp4}
        webm={state.settings.video_bg.webm}
      />

      <DraftHeader />

      <Container maxW="1400px" pt={4} height="calc(100vh - 115px)">
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
              <DraftPickBanner aligndraft="left" currentpickdraft="true">
                <DraftPickBannerWrapper>
                  <DraftCharacterPickBanner
                    aligndraft="left"
                    colorcharacter={vision["pyro"].color}
                  >
                    <DraftCharacterContainer aligndraft="left">
                      <Image
                        src="http://endgame.otakuhobbitoysph.com/cdn/characters/pick/Klee.png"
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
                    colorcharacter={vision["dendro"].color}
                  >
                    <DraftCharacterContainer aligndraft="right">
                      <Image
                        src="http://endgame.otakuhobbitoysph.com/cdn/characters/pick/Keqing.png"
                        h="100%"
                        className="character-img-pick"
                      />
                      <Box className="character-vision-icon">
                        {vision["dendro"].logoSrc}
                      </Box>
                      <DraftCharacterNameWrapper className="character-name-wrapper">
                        <DraftCharacterName>Keqing</DraftCharacterName>
                      </DraftCharacterNameWrapper>
                    </DraftCharacterContainer>
                  </DraftCharacterPickBanner>
                </DraftPickBannerWrapper>
              </DraftPickBanner>

              <DraftPickBanner aligndraft="left" currentpickdraft="false">
                <DraftPickBannerWrapper>
                  <DraftCharacterPickBanner
                    aligndraft="left"
                    colorcharacter={vision["electro"].color}
                  >
                    <DraftCharacterContainer aligndraft="left">
                      <Image
                        src="http://endgame.otakuhobbitoysph.com/cdn/characters/pick/Kujou_Sara.png"
                        h="100%"
                        className="character-img-pick"
                      />
                      <Box className="character-vision-icon">
                        {vision["electro"].logoSrc}
                      </Box>
                      <DraftCharacterNameWrapper className="character-name-wrapper">
                        <DraftCharacterName>Kujou Sara</DraftCharacterName>
                      </DraftCharacterNameWrapper>
                    </DraftCharacterContainer>
                  </DraftCharacterPickBanner>
                  <DraftCharacterPickBanner
                    aligndraft="right"
                    colorcharacter={vision["geo"].color}
                  >
                    <DraftCharacterContainer aligndraft="right">
                      <Image
                        src="http://endgame.otakuhobbitoysph.com/cdn/characters/pick/Kuki_Shinobu.png"
                        h="100%"
                        className="character-img-pick"
                      />
                      <Box className="character-vision-icon">
                        {vision["geo"].logoSrc}
                      </Box>
                      <DraftCharacterNameWrapper className="character-name-wrapper">
                        <DraftCharacterName>Kuki Shinobu</DraftCharacterName>
                      </DraftCharacterNameWrapper>
                    </DraftCharacterContainer>
                  </DraftCharacterPickBanner>
                </DraftPickBannerWrapper>
              </DraftPickBanner>

              <DraftPickBanner aligndraft="left" currentpickdraft="false">
                <DraftPickBannerWrapper>
                  <DraftCharacterPickBanner
                    aligndraft="left"
                    colorcharacter={vision["cryo"].color}
                  >
                    <DraftCharacterContainer aligndraft="left">
                      <Image
                        src="http://endgame.otakuhobbitoysph.com/cdn/characters/pick/Layla.png"
                        h="100%"
                        className="character-img-pick"
                      />
                      <Box className="character-vision-icon">
                        {vision["cryo"].logoSrc}
                      </Box>
                      <DraftCharacterNameWrapper className="character-name-wrapper">
                        <DraftCharacterName>Layla</DraftCharacterName>
                      </DraftCharacterNameWrapper>
                    </DraftCharacterContainer>
                  </DraftCharacterPickBanner>
                  <DraftCharacterPickBanner
                    aligndraft="right"
                    colorcharacter={vision["electro"].color}
                  >
                    <DraftCharacterContainer aligndraft="right">
                      <Image
                        src="http://endgame.otakuhobbitoysph.com/cdn/characters/pick/Lisa.png"
                        h="100%"
                        className="character-img-pick"
                      />
                      <Box className="character-vision-icon">
                        {vision["electro"].logoSrc}
                      </Box>
                      <DraftCharacterNameWrapper className="character-name-wrapper">
                        <DraftCharacterName>Lisa</DraftCharacterName>
                      </DraftCharacterNameWrapper>
                    </DraftCharacterContainer>
                  </DraftCharacterPickBanner>
                </DraftPickBannerWrapper>
              </DraftPickBanner>

              <DraftPickBanner aligndraft="left" currentpickdraft="false">
                <DraftPickBannerWrapper>
                  <DraftCharacterPickBanner
                    aligndraft="left"
                    colorcharacter={vision["anemo"].color}
                  >
                    <DraftCharacterContainer aligndraft="left">
                      <Image
                        src="http://endgame.otakuhobbitoysph.com/cdn/characters/pick/Mika.png"
                        h="100%"
                        className="character-img-pick"
                      />
                      <Box className="character-vision-icon">
                        {vision["anemo"].logoSrc}
                      </Box>
                      <DraftCharacterNameWrapper className="character-name-wrapper">
                        <DraftCharacterName>Mika</DraftCharacterName>
                      </DraftCharacterNameWrapper>
                    </DraftCharacterContainer>
                  </DraftCharacterPickBanner>
                  <DraftCharacterPickBanner
                    aligndraft="right"
                    colorcharacter={vision["hydro"].color}
                  >
                    <DraftCharacterContainer aligndraft="right">
                      <Image
                        src="http://endgame.otakuhobbitoysph.com/cdn/characters/pick/Mona.png"
                        h="100%"
                        className="character-img-pick"
                      />
                      <Box className="character-vision-icon">
                        {vision["hydro"].logoSrc}
                      </Box>
                      <DraftCharacterNameWrapper className="character-name-wrapper">
                        <DraftCharacterName>Mona</DraftCharacterName>
                      </DraftCharacterNameWrapper>
                    </DraftCharacterContainer>
                  </DraftCharacterPickBanner>
                </DraftPickBannerWrapper>
              </DraftPickBanner>

              <DraftBossCard>
                <Box position="relative" zIndex="25" w="100%" h="100%">
                  <DraftBossCardBGImg src={WarpImg} />

                  <Box position="relative" zIndex="50"></Box>
                </Box>
              </DraftBossCard>
            </VStack>
          </Flex>
          <Flex flex={1} w="100%" alignItems="flex-end" mb="-15px !important">
            <DraftFooter />
          </Flex>
        </VStack>
      </Container>
    </>
  );
};
export default Drafting;
