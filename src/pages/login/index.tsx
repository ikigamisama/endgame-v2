import Head from "next/head";

import { BackgroundEGWrapper, BackgroundEGVideo } from "@/src/styles";
import { useUserData } from "@/libs/providers/UserContext";
import { Box, Center, FormControl, Image } from "@chakra-ui/react";
import {
  FormLabelText,
  FormSelect,
  FormSubmitButton,
  FormTextBox,
  LoginCard,
  LoginCardWrapper,
} from "@/src/styles/login";
import { LoginImageLogo } from "@/libs/includes/image";

export default function Login() {
  const { state } = useUserData();

  return (
    <>
      <Head>
        <title>Endgame - Login</title>
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

      <Box position="relative" h="100vh">
        <LoginCard>
          <LoginCardWrapper>
            <Center mb="75px">
              <Image src={LoginImageLogo.src} w="400px" alt="login-image" />
            </Center>

            <form method="post">
              <FormControl mb="25px">
                <FormLabelText>GM Name</FormLabelText>
                <FormTextBox type="text" />
              </FormControl>

              <FormControl mb="25px">
                <FormLabelText>Secret Key</FormLabelText>
                <FormTextBox type="password" />
              </FormControl>

              <FormControl mb="50px">
                <FormLabelText>Game Type</FormLabelText>
                <FormSelect value="Officials">
                  <option value="Casuals">Casuals</option>
                  <option value="Officials">Officials</option>
                  <option value="Spiral Abyss">Spiral Abyss</option>
                </FormSelect>
              </FormControl>

              <FormSubmitButton type="submit">Create Room</FormSubmitButton>
            </form>
          </LoginCardWrapper>
        </LoginCard>
      </Box>
    </>
  );
}
