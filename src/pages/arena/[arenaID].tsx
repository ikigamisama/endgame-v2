import RadioListCard from "@/components/RadioListCard";
import { useUserData } from "@/libs/providers/UserContext";
import { modeOption } from "@/libs/includes/forms";
import {
  BackgroundEGVideo,
  BackgroundEGWrapper,
  CenterBox,
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
  SimpleGrid,
  useRadioGroup,
} from "@chakra-ui/react";
import Head from "next/head";
import { BossImage } from "@/libs/includes/image";
import { CopyIcon } from "@chakra-ui/icons";

export default function Arena() {
  const { state } = useUserData();
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "mode",
    defaultValue: "4v4",
    onChange: console.log,
  });

  const group = getRootProps();

  return (
    <>
      <Head>
        <title>Arena - Endgame</title>
        <meta name="description" content="Endgame Gramdmaster Login" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BackgroundEGWrapper>
        <BackgroundEGVideo autoPlay loop muted preload="auto">
          <source type="video/mp4" src={state.settings.video_bg.mp4} />
          <source type="video/webm" src={state.settings.video_bg.webm} />
        </BackgroundEGVideo>
      </BackgroundEGWrapper>

      <Box>asd</Box>

      <Box position="relative" h="100vh" w="100%">
        <CenterBox>
          <Container maxW="container.xl" minW="1200px">
            <HStack w="100%" gap={8}>
              <Flex w="65%">
                <ArenaCard>
                  <AreaCardWrapper widthgap="95%">
                    <ArenaPaddingWrap>
                      <ArenaTitleText>Game Setup</ArenaTitleText>
                    </ArenaPaddingWrap>

                    <form method="post">
                      <ArenaPlayersListScroll heightarea="500px">
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
                          <HStack gap={4} alignItems="center" mb="35px">
                            <FormControl>
                              <FormLabelText>Boss Enemy</FormLabelText>
                              <FormSelect placeContent="random">
                                <option value="random">Random</option>
                              </FormSelect>
                            </FormControl>
                            <Box>
                              <ArenaBossCircleWrapper>
                                <Image src={BossImage.src} w="100%" />
                              </ArenaBossCircleWrapper>
                            </Box>
                          </HStack>

                          <SimpleGrid columns={2} spacing={8} mb="35px">
                            <FormControl>
                              <FormLabelText>First Pick Team</FormLabelText>
                              <Box position="relative" cursor="pointer">
                                <AvatarCircle>
                                  <Image
                                    src="https://api.dicebear.com/6.x/adventurer/svg?seed=Baby"
                                    alt="avatar"
                                    width="100%"
                                  />
                                </AvatarCircle>
                                <AvatarNameWrapper>
                                  <AvatarName>Player 1</AvatarName>
                                </AvatarNameWrapper>
                              </Box>
                            </FormControl>
                            <FormControl>
                              <FormLabelText>Second Pick Team</FormLabelText>
                              <Box position="relative" cursor="pointer">
                                <AvatarCircle>
                                  <Image
                                    src="https://api.dicebear.com/6.x/adventurer/svg?seed=Baby"
                                    alt="avatar"
                                    width="100%"
                                  />
                                </AvatarCircle>
                                <AvatarNameWrapper>
                                  <AvatarName>Player 2</AvatarName>
                                </AvatarNameWrapper>
                              </Box>
                            </FormControl>
                          </SimpleGrid>

                          <FormControl mb="35px">
                            <FormLabelText>Link</FormLabelText>
                            <FormSubmitButton
                              type="button"
                              leftIcon={<CopyIcon />}
                              onClick={() =>
                                navigator.clipboard.writeText(
                                  window.location.href
                                )
                              }
                            >
                              Copy Link
                            </FormSubmitButton>
                          </FormControl>

                          <FormControl mb="35px">
                            <ArenaCheckbox size="lg">
                              Ban one Character randomly
                            </ArenaCheckbox>
                          </FormControl>

                          <HStack gap={4} alignItems="center" mb="35px">
                            <FormControl>
                              <FormLabelText>Banned Character</FormLabelText>
                              <FormSelect placeContent="random">
                                <option value="Kamisato Ayaka">
                                  Kamisato Ayaka
                                </option>
                              </FormSelect>
                            </FormControl>
                            <Box>
                              <ArenaBossCircleWrapper>
                                <Image src={BossImage.src} w="100%" />
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

                    <ArenaPlayersListScroll heightarea="580px">
                      <ArenaPaddingWrap>
                        <Grid templateColumns="repeat(1, 1fr)" gap={6}>
                          <GridItem>
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
                          </GridItem>
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
}
