import { VideoPropsSettings } from "@/libs/helpers/types";
import { BackgroundEGVideo, BackgroundEGWrapper } from "@/src/styles";
import { useEffect, useRef } from "react";

export default function BackgroundVid({ mp4, webm }: VideoPropsSettings) {
  const videoRef = useRef<any>(null);

  useEffect(() => {
    videoRef.current?.load();
  }, [mp4, webm]);

  return (
    <BackgroundEGWrapper>
      <BackgroundEGVideo autoPlay loop muted preload="auto" ref={videoRef}>
        <source type="video/mp4" src={mp4} />
        <source type="video/webm" src={webm} />
      </BackgroundEGVideo>
    </BackgroundEGWrapper>
  );
}
