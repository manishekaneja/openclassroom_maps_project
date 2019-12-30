import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ReadStream } from 'tty';

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

export default class RatingRow extends React.Component {

    render() {
        const rate = this.props.rate;
        return <>
            <div style={{
                display: 'flex', justifyContent: 'center',alignItems:'center',
                borderBottom: '1px solid rgba(51, 51, 51,0.5)', padding: 10
            }}><div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14 }}>{rate.comment}</p>
                </div>
                <div style={{ height: 50, width: 50, display: 'flex', justifyContent: 'center',alignItems:'center' }} >
                    <p style={{ fontSize: 24 }}>
                        <span style={{ color: 'red', fontWeight: '900', textShadow: '0px 0px 2px yellow' }}>
                            {rate.stars}
                        </span> </p>
                </div>
            </div>
        </>
    }
}