import React from 'react';
import styled from 'styled-components';
import { Container, Button } from '../../../styled_components';
const Header = styled(Container)`
    background-color: rgba(255, 228, 196, 0.3);
    box-shadow: 0px 0.2px 0.5px #333;
    font-family: monospace;
    minHeight: 100px;
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
export function DrawerHeader({ closeMenu, phrase, updatePhrase, selectedRating, updateSelectedRating }) {
    return <Header>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingTop: 40 }}>
            <SearchBar
                type="text"
                placeholder="What you Are Looking For?"
                value={phrase}
                onChange={function (event) {
                    updatePhrase(event.target.value);
                }} />
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <div style={{ width: '100%', height: 24 }}>
                    <span style={{ fontSize: 18 }}>Select a on Basis of Rating</span>
                </div>
                <div>
                    <input checked={selectedRating === 1} onClick={_ => updateSelectedRating(1)} type="radio" name="one" />
                    <span style={{ fontSize: 16, fontFamily: 'monospace', }}>1</span>
                </div>
                <div>
                    <input checked={selectedRating === 2} type="radio" name="one" onClick={_ => updateSelectedRating(2)} />
                    <span style={{ fontSize: 16, fontFamily: 'monospace' }}>2</span>
                </div>
                <div>
                    <input checked={selectedRating === 3} type="radio" name="one" onClick={_ => updateSelectedRating(3)} />
                    <span style={{ fontSize: 16, fontFamily: 'monospace' }}>3</span>
                </div>
                <div>
                    <input checked={selectedRating === 4} type="radio" name="one" onClick={_ => updateSelectedRating(4)} />
                    <span style={{ fontSize: 16, fontFamily: 'monospace' }}>4</span>
                </div>

                <div>
                    <input checked={selectedRating === 5} type="radio" name="one" onClick={_ => updateSelectedRating(5)} />
                    <span style={{ fontSize: 16, fontFamily: 'monospace' }}>5</span>
                </div>
                <div>
                    <input checked={selectedRating === -1} type="radio" name="one" onClick={_ => updateSelectedRating(-1)} />
                    <span style={{ fontSize: 16, fontFamily: 'monospace' }}>All</span>
                </div>
            </div>
        </div>
        <CloseButton onClick={closeMenu} id="close">
            <i className="fas fa-times"></i>
        </CloseButton>
    </Header >
}