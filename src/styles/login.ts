import { Box, Button, FormLabel, Input, Select } from '@chakra-ui/react'
import styled from '@emotion/styled'


export const LoginCard = styled(Box)`
    min-width: 600px;
    max-width: 850px;
    background-color: #ecdeb5;
    border-radius:15px;
    overflow: hidden;
    box-shadow: 0 8px 17px 2px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12), 0 5px 5px -3px rgba(0,0,0,0.2);
`

export const LoginCardWrapper = styled(Box)`
    background-color: #1e223f;
    height: 100%;
    width: 95%;
    margin: auto;
    padding: 50px 35px;
    border: 1px solid #1e223f;
    box-shadow: inset 0 0 10px #000;
`

export const FormLabelText = styled(FormLabel)`
    font-family: 'GenshinFont', sans-serif;
    color: #ebebeb;
    font-size: 22px;
    margin-bottom: 15px;
`

export const FormTextBox = styled(Input)`
    font-size: 22px;
    color: #ebebeb;
    border-radius: 33px;
    width: 100%;
    transition:  0.2 5s all;
    border: 2px solid #ebebeb;
    font-family: 'GenshinFont', sans-serif;
    padding: 22px 18px;
    box-shadow: 0 0 10px #000;

    &:focus{
        outline: none !important;
        border: 2px solid #ebebeb;
    }

    &:focus-visible{
        border-color: #ebebeb;
        background-color: #ebebeb;
        color: #1e223f;
        box-shadow: 0 0 20px #000;
    }

    &:hover{
        border: 2px solid #ebebeb;
    }

`

export const FormSelect = styled(Select)`
    font-size: 22px;
    color: #ebebeb;
    border-radius: 33px;
    width: 100%;
    transition:  0.25s all;
    border: 2px solid #ebebeb;
    font-family: 'GenshinFont', sans-serif;
    padding: 10px 18px;
    height: auto;
    box-shadow: 0 0 10px #000;

    &:focus{
        outline: none !important;
        box-shadow: none;
        border: 2px solid #ebebeb;
    }

    &:hover{
        border: 2px solid #ebebeb;
    }
   
`

export const FormSubmitButton = styled(Button)`
    width: 100%;
    border-radius: 33px;
    background-color: #ECE5D8;
    color: #1e223f;
    font-family: 'GenshinFont', sans-serif;
    font-size: 18px;
    padding: 24px 18px;
    line-height: 1;
    box-shadow: 0 0 10px #000;

    &:hover{
        background-color: #ECE5D8;
        box-shadow: 0 0 20px #000;
    }
`