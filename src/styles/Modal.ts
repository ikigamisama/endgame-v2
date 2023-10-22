import { Box, Button, ModalContent, Text } from '@chakra-ui/react'
import styled from '@emotion/styled'


export const EndgameModalContent = styled(ModalContent)`
  background-color: #ECDEB5;
`

export const EndgameModalWrapper = styled(Box)`
    background-color: #1e223f;
    width: 94%;
    margin: auto;
    box-shadow: inset 0 0 10px #000;
`

export const ModalTextEndgame = styled(Text)`
    font-family: 'GenshinFont', sans-serif;
    color: white;
    font-size: 20px;
`

export const ModalEndgameButton = styled(Button)`
    font-family: 'GenshinFont', sans-serif;
    margin-right: 10px !important;
    box-shadow: 0 0 10px #000;

    &:hover {
        box-shadow: 0 0 20px #000;
    }
`