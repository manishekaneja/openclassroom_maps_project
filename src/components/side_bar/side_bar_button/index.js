import React from 'react';
import styled from 'styled-components';
import { Button } from '../../styled_components/index';

const MenuButton = styled(Button)`
    position: fixed;
    z-index: 1;
    bottom: 25px;
    left: 20px;
    background-color:rgba(255,255,255,0.7);
    border-radius:10px;
    ::after{
        content: "MENU";
        transition: 0.4s;
        width: 0px;
        top: 0px;
        left: 100%;
        overflow: hidden;
        position: absolute;
        padding: 0px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        font-family: monospace;    
    }
    :hover{
        color:aliceblue;
        background-color:#333;
        ::after{
            width: 100px;
            color: aliceblue;
            background-color: #333;
        }
    }

`

export default function SideBarButton({ openMenu }) {
    return <MenuButton onClick={openMenu}><i className="fas fa-bars"></i></MenuButton>;

}