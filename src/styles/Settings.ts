import { Box, Button, IconButton, Tab } from '@chakra-ui/react'
import styled from '@emotion/styled'

export const SettingsTabs = styled(Tab)`
    font-family: 'GenshinFont',sans-serif;
    color: #ecdeb5;
    font-size: 18px;
`
export const SettingsProfileAvatarWrapper = styled(Box)`
    width: 150px;
    height: 150px;
    border-radius: 100%;
    background-color: #ecdeb5;
    margin-bottom: 25px;
    overflow: hidden;
    border: 5px solid  #ecdeb5;
`

export const TableTextFont = styled.p`
    font-family: 'GenshinFont',sans-serif;
    color: #ecdeb5;
`

export const AccountAvatar = styled(Box)`
    width: 50px;
    height: 50px;
    border-radius: 100%;
    background-color: #ecdeb5;
    overflow: hidden;
    border: 5px solid  #ecdeb5;
`

export const TableFeaetureButton = styled(IconButton)`
   background-color: rgb(97,177,98);
   border-radius: 100%;

   &:hover{
        background-color: rgb(97,177,98);
   }
`