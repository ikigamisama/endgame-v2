import BackgroundVid from "@/components/BackgroundVid";
import DraftHeader from "@/components/DraftHeader";
import { useUserData } from "@/libs/providers/UserContext";
import { Box, Container, Flex, VStack } from "@chakra-ui/react";

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

      <Container maxW="1200px" py={8} height="calc(100vh - 115px)">
        <VStack h="100%" justifyContent="space-between">
          <Flex flex={1}>asd</Flex>
          <Flex flex={1}>asd</Flex>
          <Flex flex={1}>zxc</Flex>
        </VStack>
      </Container>
    </>
  );
};
export default Drafting;
