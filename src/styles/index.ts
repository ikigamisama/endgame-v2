import { Box } from '@chakra-ui/react'
import styled from '@emotion/styled'


export const BackgroundEGWrapper = styled.div`
   width: 100%;
   height: 100vh;
   position: absolute;
   top: 0;
   left: 0;
   bottom: 0;
   right: 0;
   z-index: -1;
`

export const BackgroundEGVideo = styled.video`
    height: 100%;
    width: 100%;
    object-fit: cover;
`

export const CenterBox = styled(Box)`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`
