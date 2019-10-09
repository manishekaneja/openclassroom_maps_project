import styled from 'styled-components'

const Container = styled.div`
    margin:0px;
    padding:0px;
    box-sizing:border-box;
`;
const DarkContainer = styled(Container)`
    background-color: #282c34;
    color: white;
`;

const FlexCenter = styled(Container)`
    display:flex;
    justify-content:center;
    align-items:center;
`;
const Button = styled.button`
    color: #333;
    font-size: 30px;
    background-color: transparent;
    border: 0px;
    transition: 0.4s;
    padding: 10px;
    :hover{
        color:#777;
    }
`;
const DarkButton = styled(Button)`
color:aliceblue;
background-color:#333;
`;




export { FlexCenter, Container, DarkContainer, Button, DarkButton };

