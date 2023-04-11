import { VideoProerties } from '@/libs/helpers/types'
import { Box, PopoverCloseButton, PopoverHeader, Text } from '@chakra-ui/react'
import styled from '@emotion/styled'



export const BackgroundEGWrapper = styled.div<VideoProerties> `
   width: 100%;
   height: ${(props) => (props.videoheight)};
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

export const ButtonPopUpNav = styled(Box)`
    width: 50px;
    height: 50px;
    cursor: pointer;
    background-color: #ecdeb5;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #1e223f;
`

export const FontHeaderPopup = styled(PopoverHeader)`
    font-family: 'GenshinFont', sans-serif;
    color: #ecdeb5;
    font-size: 22px;
    margin-bottom: 15px;
    text-shadow: -1px 0 #1e223f, 0 1px #1e223f, 1px 0 #1e223f, 0 -1px #1e223f;
`

export const PopupCloseButton = styled(PopoverCloseButton)`
    & > svg{
        width: 22px;
        height: 22px;
    }
`

export const LinkTextMenu = styled(Text)`
    font-family: 'GenshinFont', sans-serif;
    font-size: 18px;
    color: white;
` 

export const ToastText = styled(Text)`
    font-family: 'GenshinFont', sans-serif;
    font-size: 16px;
    color: white;
    line-height: 1;
`