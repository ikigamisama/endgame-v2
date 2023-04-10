import { CharacterDraftDesignProps } from '@/libs/helpers/types'
import { Box, Button, Text } from '@chakra-ui/react'
import styled from '@emotion/styled'

export const ModalCharacterPickBlur = styled(Box)<CharacterDraftDesignProps>`
    filter: blur( ${(props) => (props.ischaractermodalactive === 'true' ? '30px' : '0px')});
    position: relative;
    z-index: 500;
`

export const ModalCharacterPickWrapper = styled(Box)`
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 550;
    background-color: rgba(119, 119, 119,0.5);
`

export const ModalCharacterPickheader = styled(Box)`
    width: 100%;
    padding: 10px 50px;
    background-color: rgba(31, 35, 65, 0.5);
`

export const ModalCharacterTextHeader = styled(Text)`
    font-family: 'GenshinFont', sans-serif;
    font-size: 18px;
    line-height: 1;
    color: #d0b98c;
` 

export const CharacterVisionButton = styled(Box)<CharacterDraftDesignProps>`
    width: 50px;
    height: 50px;
    border-radius: 100%;
    position: relative;
    cursor: pointer;
    background-color: ${(props) => (props.isselectedeleemnt === 'true' ? '#ece5d8;' : 'transparent;')}
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.25s all;

    ${(props) => (props.isselectedeleemnt === 'false' ? `
        &:hover{
            background-color: rgba(119, 119, 119,0.5);
        }   
    ` : '')}


    & > svg{
        width: 40px;
        height: 40px;
    }

    & > svg > g{
        fill: ${(props) => (props.isselectedeleemnt === 'true' ? '#495366;' : '#b9b4af;')};
    }
` 

export const CharacterPickModalCloseButton = styled(Button)`
   width: 50px;
   height: 50px;
    border-width: 5px;
    border-color: rgb(185, 180, 175);
    border-style: solid;
    border-radius: 100%;
    background-color: rgb(236, 229, 216) !important;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;

    & > svg{
        width: 20px;
        height: 20px;
    }
`


export const ModalCharacterPickBody = styled(Box)`
    width: 100%;
    height: calc(100vh - 50px);
    padding: 10px;
`


//#495366
//#b9b4af