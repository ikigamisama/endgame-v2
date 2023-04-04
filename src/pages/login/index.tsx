import Head from "next/head";

import { BackgroundEGWrapper, BackgroundEGVideo } from "@/src/styles";
import { useUserData } from "@/libs/providers/UserContext";

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
    </>
  );
}
