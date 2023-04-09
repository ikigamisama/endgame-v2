import BackgroundVid from "@/components/BackgroundVid";
import DraftCountdown from "@/components/DraftCountdown";
import DraftFooter from "@/components/DraftFooter";
import DraftHeader from "@/components/DraftHeader";
import { vision } from "@/libs/includes/color";
import {
  CharacterSamplePick1,
  CharacterSamplePick2,
  CharacterSamplePick3,
  CharacterSamplePick4,
  CharacterSamplePick5,
  CharacterSamplePick6,
  CharacterSamplePick7,
  CharacterSamplePick8,
  WarpImg,
} from "@/libs/includes/image";
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
              height="550px"
              justifyContent="center"
              position="relative"
              zIndex="15"
            >
              <DraftPickBanner aligndraft="left">
                <DraftPickBannerWrapper>
                  <DraftCharacterPickBanner
                    aligndraft="left"
                    colorcharacter={vision["pyro"].color}
                  >
                    <DraftCharacterContainer aligndraft="left">
                      <Image src={CharacterSamplePick1} h="100%" />
                      <DraftCharacterNameWrapper>
                        <DraftCharacterName>Klee</DraftCharacterName>
                      </DraftCharacterNameWrapper>
                    </DraftCharacterContainer>
                  </DraftCharacterPickBanner>
                  <DraftCharacterPickBanner
                    aligndraft="right"
                    colorcharacter={vision["electro"].color}
                  >
                    <DraftCharacterContainer aligndraft="right">
                      <Image src={CharacterSamplePick2} h="100%" />
                      <DraftCharacterNameWrapper>
                        <DraftCharacterName>Keqing</DraftCharacterName>
                      </DraftCharacterNameWrapper>
                    </DraftCharacterContainer>
                  </DraftCharacterPickBanner>
                </DraftPickBannerWrapper>
              </DraftPickBanner>

              <DraftPickBanner aligndraft="left">
                <DraftPickBannerWrapper>
                  <DraftCharacterPickBanner
                    aligndraft="left"
                    colorcharacter={vision["electro"].color}
                  >
                    <DraftCharacterContainer aligndraft="left">
                      <Image src={CharacterSamplePick3} h="100%" />
                      <DraftCharacterNameWrapper>
                        <DraftCharacterName>Kujou Sara</DraftCharacterName>
                      </DraftCharacterNameWrapper>
                    </DraftCharacterContainer>
                  </DraftCharacterPickBanner>
                  <DraftCharacterPickBanner
                    aligndraft="right"
                    colorcharacter={vision["electro"].color}
                  >
                    <DraftCharacterContainer aligndraft="right">
                      <Image src={CharacterSamplePick4} h="100%" />
                      <DraftCharacterNameWrapper>
                        <DraftCharacterName>Kuki Shinobu</DraftCharacterName>
                      </DraftCharacterNameWrapper>
                    </DraftCharacterContainer>
                  </DraftCharacterPickBanner>
                </DraftPickBannerWrapper>
              </DraftPickBanner>

              <DraftPickBanner aligndraft="left">
                <DraftPickBannerWrapper>
                  <DraftCharacterPickBanner
                    aligndraft="left"
                    colorcharacter={vision["cryo"].color}
                  >
                    <DraftCharacterContainer aligndraft="left">
                      <Image src={CharacterSamplePick5} h="100%" />
                      <DraftCharacterNameWrapper>
                        <DraftCharacterName>Layla</DraftCharacterName>
                      </DraftCharacterNameWrapper>
                    </DraftCharacterContainer>
                  </DraftCharacterPickBanner>
                  <DraftCharacterPickBanner
                    aligndraft="right"
                    colorcharacter={vision["electro"].color}
                  >
                    <DraftCharacterContainer aligndraft="right">
                      <Image src={CharacterSamplePick6} h="100%" />
                      <DraftCharacterNameWrapper>
                        <DraftCharacterName>Lisa</DraftCharacterName>
                      </DraftCharacterNameWrapper>
                    </DraftCharacterContainer>
                  </DraftCharacterPickBanner>
                </DraftPickBannerWrapper>
              </DraftPickBanner>

              <DraftPickBanner aligndraft="left">
                <DraftPickBannerWrapper>
                  <DraftCharacterPickBanner
                    aligndraft="left"
                    colorcharacter={vision["cryo"].color}
                  >
                    <DraftCharacterContainer aligndraft="left">
                      <Image src={CharacterSamplePick7} h="100%" />
                      <DraftCharacterNameWrapper>
                        <DraftCharacterName>Mika</DraftCharacterName>
                      </DraftCharacterNameWrapper>
                    </DraftCharacterContainer>
                  </DraftCharacterPickBanner>
                  <DraftCharacterPickBanner
                    aligndraft="right"
                    colorcharacter={vision["hydro"].color}
                  >
                    <DraftCharacterContainer aligndraft="right">
                      <Image src={CharacterSamplePick8} h="100%" />
                      <DraftCharacterNameWrapper>
                        <DraftCharacterName>Mona</DraftCharacterName>
                      </DraftCharacterNameWrapper>
                    </DraftCharacterContainer>
                  </DraftCharacterPickBanner>
                </DraftPickBannerWrapper>
              </DraftPickBanner>

              <DraftBossCard>
                <Box position="relative" zIndex="25" w="100%" h="100%">
                  <DraftBossCardBGImg src={WarpImg} />
                </Box>
              </DraftBossCard>
            </VStack>
          </Flex>
          <Flex flex={1} w="100%" alignItems="flex-end">
            <DraftFooter />
          </Flex>
        </VStack>
      </Container>
    </>
  );
};
export default Drafting;
