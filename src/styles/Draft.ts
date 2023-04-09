import { DraftPositionProps } from '@/libs/helpers/types'
import { Box } from '@chakra-ui/react'
import styled from '@emotion/styled'

export const BossDraftContainer = styled(Box)`
    width: 200px;
    height: 115px;
    background-color: #ecdeb5;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    margin-inline-start: 0rem !important;
`

export const BossDraftWrapper = styled(Box)`
    width: 100%;
    height: 100px;
    position:relative;
    z-index: 30;
    background-color: #1E223F;
    display: flex;
    align-items: flex-end;

    & > img{
        position: absolute;
        left: 0;
        top: 0;
    }
`
export const BossNameWrapper = styled(Box)`
    position: relative;
    z-index: 50;
    width: 100%;
    height: 30px;
    display: flex;

    background: linear-gradient( 0deg, rgb(0,0,0) 20%, rgba(0,0,0,0) 100%);
    color: white;
    font-family: 'GenshinFont', sans-serif;
    text-align:center;
    justify-content: center;
    align-items: flex-end;
    font-size: 14px;
`

export const BanCharactersListContainer = styled(Box)<DraftPositionProps>`
    width: 550px;
    height: 100px;
    background-color: #ecdeb5;
    ${(props) => (props.aligndraft === 'left' ? 'border-bottom-left-radius: 15px;' : 'border-bottom-right-radius: 15px;')}
    margin-inline-start: 0rem !important;
    display: flex;
    justify-content:  ${(props) => (props.aligndraft === 'left' ? 'flex-end' : 'flex-start')};
` 

export const BanCharactersListWrapper = styled(Box)`
    width: 530px;
    height: 100%;
    background-color: #ecdeb5;
    position: relative;
    z-index: 10;
`

export const BanCharacterWrapper = styled(Box)<DraftPositionProps>`
    position: absolute;
    ${(props) => (props.aligndraft === 'left' ? 'right: 0;' : 'left: 0;')}
    top: 0;
    width: ${(props) => (props.widthcharacter)};
    height: 100px;
    background-color: ${(props) => (props.colorcharacter)};
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    ${(props) => (props.aligndraft === 'left' ? 'border-bottom-left-radius: 15px;' : 'border-bottom-right-radius: 15px;')}
    z-index:${(props) => (props.indexcharacter)};
    overflow:hidden;
    display: flex;
    justify-content:  ${(props) => (props.aligndraft === 'left' ? 'flex-start' : 'flex-end')};
`


export const DraftCountDownCard = styled(Box)`

`