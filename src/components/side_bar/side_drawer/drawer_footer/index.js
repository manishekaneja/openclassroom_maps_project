import React from 'react';
import styled from 'styled-components';
import { Container, Button } from '../../../styled_components';
// import Switch from 'react-switch';

const Footer = styled(Container)`
    background-color: rgba(255, 228, 196, 0.3);
    font-family: monospace;
    height: 60px;
    padding: 10px;
    font-size: 20px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`

export function DrawerFooter({updateCenter}) {
    // const [state, updateState] = useState(false);
    return <Footer className="footer" style={{
        display: 'flex', alignItems: "center"
    }} >
        <Button style={{ fontSize: 24 }} onClick={()=>{
            updateCenter()
        }} > Home</Button>
        {/* <label style={{ display: 'flex', justifyContent: "space-around", alignItems: "center", width: 200 }}>
            <span>Dark Mode</span>
            <Switch checked={state} onChange={value => updateState(value)} />
        </label> */}
    </Footer>

}