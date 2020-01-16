import styled from 'styled-components';

const ImageSlider = styled.div`
position: fixed;
top:10px;
right:10px;
max-width:50%;
border:none;
background-color:white;
z-index:10;
overflow:hidden;
border-radius:10px;
transition:0.5s;
display:flex;
justify-content: space-between;
align-items: flex-start;
flex-direction: column;
${({show})=>show?`
&{
    height:500px;
    width:500px;
    opactiy:0;
    box-shadow:0px 1px 5px #333;
}
`:`
&{
    height:0px;
    width:0px;
    opactiy:0;
    box-shadow:none;
}
`}


&>div.head, &>div.foot{
background-color:#333;
min-height:10px;
height:10px;
width:100%;
flex:0.1;
}

&>div.content{
    flex:1.2;
    overflow:hidden;
    padding:2px;
}
&>div.content>img{
    width:100%;
    height:100%;
    transition:0.45s;
    transform:translateY(calc(-${({count})=>count*100}% - ${({count})=>count*4}px)); 
}


`


export default ImageSlider;