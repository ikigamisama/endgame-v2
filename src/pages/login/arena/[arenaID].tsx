import Head from "next/head";
import { LoginImageLogo } from "@/libs/includes/image";
import { useUserData } from "@/libs/providers/UserContext";
import {
  BackgroundEGVideo,
  BackgroundEGWrapper,
  CenterBox,
} from "@/src/styles";
import {
  AvatarCircle,
  AvatarName,
  AvatarNameWrapper,
} from "@/src/styles/Arena";
import {
  FormLabelText,
  FormSelect,
  FormSubmitButton,
  FormTextBox,
  LoginCard,
  LoginCardWrapper,
} from "@/src/styles/login";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Box, Center, FormControl, Image } from "@chakra-ui/react";
import { avatarList } from "@/libs/includes/avatars";
import { PlayerLoginProps } from "@/libs/helpers/types";

export default function Arena() {
  const { state } = useUserData();
  const { handleSubmit, control, watch } = useForm<PlayerLoginProps>({
    defaultValues: {
      team_name: "",
      avatar: "",
    },
  });

  const watchTeamName = watch("team_name"),
    watchAvatar = watch("avatar");

  const submitPlayerLogin: SubmitHandler<PlayerLoginProps> = (data) => {
    console.log(data);
  };
  return (
    <>
      <Head>
        <title>Endgame - Player Login</title>
        <meta name="description" content="Generated by create next app" />
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
        <CenterBox>
          <LoginCard>
            <LoginCardWrapper>
              <Center mb="75px">
                <Image src={LoginImageLogo.src} w="400px" alt="login-image" />
              </Center>
              <form method="post" onSubmit={handleSubmit(submitPlayerLogin)}>
                <FormControl mb="25px">
                  <FormLabelText>Team Name</FormLabelText>
                  <Controller
                    render={({ field: { onChange, value, name } }) => (
                      <FormTextBox
                        type="text"
                        onChange={onChange}
                        value={value}
                        name={name}
                      />
                    )}
                    name="team_name"
                    control={control}
                  />
                </FormControl>

                <FormControl mb="25px">
                  <FormLabelText>Avatar</FormLabelText>
                  <Controller
                    render={({ field: { onChange, value, name } }) => (
                      <FormSelect
                        type="text"
                        placeContent="Select Avatar"
                        onChange={onChange}
                        value={value}
                        name={name}
                      >
                        {avatarList.map((data, d) => (
                          <option key={d} value={data.img}>
                            {data.name}
                          </option>
                        ))}
                      </FormSelect>
                    )}
                    name="avatar"
                    control={control}
                  />
                </FormControl>

                <FormControl mb="50px">
                  <FormLabelText>Preview</FormLabelText>
                  <Box position="relative">
                    <AvatarCircle>
                      <Image
                        src={
                          watchAvatar !== ""
                            ? watchAvatar
                            : "https://api.dicebear.com/6.x/adventurer/svg?seed=Baby"
                        }
                        alt="avatar"
                        width="100%"
                      />
                    </AvatarCircle>
                    <AvatarNameWrapper>
                      <AvatarName>{watchTeamName}</AvatarName>
                    </AvatarNameWrapper>
                  </Box>
                </FormControl>

                <FormSubmitButton type="submit">Join Room</FormSubmitButton>
              </form>
            </LoginCardWrapper>
          </LoginCard>
        </CenterBox>
      </Box>
    </>
  );
}
