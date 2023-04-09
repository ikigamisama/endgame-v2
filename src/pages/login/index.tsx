import Head from "next/head";
import { CenterBox } from "@/src/styles";
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
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { GMLoginProps } from "@/libs/helpers/types";
import BackgroundVid from "@/components/BackgroundVid";
import { NextPage } from "next";

const Login: NextPage = () => {
  const { state } = useUserData();
  const { handleSubmit, control } = useForm<GMLoginProps>({
    defaultValues: {
      gm_name: "",
      secret_key: "",
      game_type: "",
    },
  });

  const submitGMLogin: SubmitHandler<GMLoginProps> = (data) => {
    console.log(data);
  };

  return (
    <>
      <Head>
        <title>Endgame - Login</title>
        <meta name="description" content="Endgame Gramdmaster Login" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BackgroundVid
        mp4={state.settings.video_bg.mp4}
        webm={state.settings.video_bg.webm}
      />

      <Box position="relative" h="100vh">
        <CenterBox>
          <LoginCard>
            <LoginCardWrapper>
              <Center mb="75px">
                <Image src={LoginImageLogo} w="400px" alt="login-image" />
              </Center>

              <form method="post" onSubmit={handleSubmit(submitGMLogin)}>
                <FormControl mb="25px">
                  <FormLabelText>GM Name</FormLabelText>
                  <Controller
                    render={({ field: { onChange, value, name } }) => (
                      <FormTextBox
                        type="text"
                        onChange={onChange}
                        value={value}
                        name={name}
                      />
                    )}
                    name="gm_name"
                    control={control}
                  />
                </FormControl>

                <FormControl mb="25px">
                  <FormLabelText>Secret Key</FormLabelText>
                  <Controller
                    render={({ field: { onChange, value, name } }) => (
                      <FormTextBox
                        type="password"
                        onChange={onChange}
                        value={value}
                        name={name}
                      />
                    )}
                    name="secret_key"
                    control={control}
                  />
                </FormControl>

                <FormControl mb="50px">
                  <FormLabelText>Game Type</FormLabelText>
                  <Controller
                    render={({ field: { onChange, value, name } }) => (
                      <FormSelect
                        variant="outline"
                        placeholder="Select Game Type"
                        onChange={onChange}
                        name={name}
                        value={value}
                      >
                        <option value="Casuals">Casuals</option>
                        <option value="Officials">Officials</option>
                        <option value="Spiral Abyss">Spiral Abyss</option>
                      </FormSelect>
                    )}
                    name="game_type"
                    control={control}
                  />
                </FormControl>

                <FormSubmitButton type="submit">Create Room</FormSubmitButton>
              </form>
            </LoginCardWrapper>
          </LoginCard>
        </CenterBox>
      </Box>
    </>
  );
};

export default Login;
