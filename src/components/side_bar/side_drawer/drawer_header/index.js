import React from 'react';
import styled from 'styled-components';
import { Container, Button } from '../../../styled_components';
const Header = styled(Container)`
    background-color: rgba(255, 228, 196, 0.3);
    box-shadow: 0px 0.2px 0.5px #333;
    font-family: monospace;
    height: 100px;
    padding: 20px;
    font-size: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const SearchBar = styled.input`
    width:300px;
    background-color: rgba(50, 50, 50, 0.1);
    padding: 10px;
    font-size: 20px;
    border: 0px;
`;
const CloseButton = styled(Button)`
    transition: 0.5s;
    border-radius: 50%;
    overflow: hidden;
    border: 0px;
    background-color: transparent;
    width: 50px;
    font-size: 20px;
    height: 50px;
    :hover{
        transform: rotateZ(180deg) scale(1.5);
    }
`;
export function DrawerHeader({ closeMenu, phrase, updatePhrase }) {
    return <Header>
        <SearchBar
            type="text"
            placeholder="What you Are Looking For?"
            value={phrase}
            onChange={function (event) {
                updatePhrase(event.target.value);
            }} />
        <CloseButton onClick={closeMenu} id="close">
            <i className="fas fa-times"></i>
        </CloseButton>
    </Header>
}