import { Box, Text } from '@chakra-ui/react'
import styled from '@emotion/styled'


export const AvatarCircle = styled(Box)`
    position: relative;
    width: 75px;
    height: 75px;
    border-radius: 100%;
    overflow: hidden;
    border: 5px solid #ecdeb5;
    background-color: #ecdeb5;
    z-index: 15;
`
export const AvatarNameWrapper = styled(Box)`
    position: absolute;
    width: 100%;
    height: 45px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #ecdeb5;
    border-radius: 33px;
    z-index: 10;
    display: flex;
    align-items:center;
`

export const AvatarName = styled(Text)`
    font-family: 'GenshinFont', sans-serif;
    font-size: 20px;
    color: #3e4557;
    margin-left: 85px;
   
`