import React from 'react';
import styled from 'styled-components';

const RatingStar = styled.i`
color: rgba(218, 165, 32,0.7);
`
const ActiveRatingStar = styled.i`
transition: 0.2s;
color: gold;
&:hover{
    transform: scale(1.2);
}
`
export { ActiveRatingStar, RatingStar };

export default function RatingRow({ rate }) {
    return <>
        <div style={{
            borderBottom: '1px solid rgba(51, 51, 51,0.5)', padding: 10
        }}>
            <div>
                {Array(Number(rate.stars)).fill(1).map((_, index) => <ActiveRatingStar key={index} className="fas fa-star active_star" />)}
                {Array(5 - Number(rate.stars)).fill(1).map((_, index) => <RatingStar key={index} className="fas fa-star star" />)}
            </div>
            <p style={{ fontSize: 14 }}>{rate.comment}</p>
        </div>
    </>
}