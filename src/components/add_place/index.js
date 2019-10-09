import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ActiveRatingStar, RatingStar } from '../side_bar/place_card/rating_row';

const FixedLayer = styled.div`
    position:fixed;
    width:100vw;
    height:100vh;
    top:0px;
    left:0px;
    background-color:rgba(51,51,51,0.7);
    display:flex;
    justify-content:center;
    align-items:center;
    z-index:100;
    overflow:hidden;
    transition: 0.5s;
`;

function useReviewDetails(show) {
    let [comment, updateComment] = useState('');
    let [count, updateCount] = useState(0);
    useEffect(() => {
        updateCount(0);
    }, [show])
    return { comment, updateComment, count, updateCount };
}

function useDetails() {
    let [nameOfPlace, updatePlaceName] = useState('');
    let [addressOfPlace, updatePlaceAddress] = useState('');
    return { nameOfPlace, addressOfPlace, updatePlaceAddress, updatePlaceName };
}

export function AddRating({ show, onAddClick, onCloseClick }) {
    let { comment, updateComment, count, updateCount } = useReviewDetails(show);
    return <FixedLayer style={{ width: show ? '100vw' : 0 }}>
        <div style={styles.innerBoxStyles}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', padding: 10 }} >
                {Array(Number(count)).fill(1).map((_, index) => <span key={index} onClick={() => updateCount(index + 1)}><ActiveRatingStar style={{ fontSize: (20 + (index * 5)) }} className="fas fa-star active_star" /></span>)}
                {Array(5 - Number(count)).fill(1).map((_, index) => <span key={index} onClick={() => updateCount(c => c + index + 1)}><RatingStar style={{ fontSize: 20 }} key={index} className="fas fa-star star" /></span>)}
            </div>
            <input style={styles.inputStyle} value={comment} onChange={event => updateComment(event.target.value)} type="text" placeholder="What's your Review.." />
            <div style={styles.buttonContainer} >
                <button style={styles.buttonStyle} onClick={function () {
                    if (comment.trim().length > 0) {
                        updateComment('');
                        onAddClick(comment, count);
                    }
                }}>
                    Submit
                </button>
                <button className="close" style={styles.buttonStyle} onClick={onCloseClick}>
                    <i className="fas fa-times"></i>
                </button>
            </div>
        </div>
    </FixedLayer >
}

export function AddPlace({ show, onAddClick, onCloseClick }) {
    let { nameOfPlace, addressOfPlace, updatePlaceAddress, updatePlaceName } = useDetails();
    return <FixedLayer style={{ width: show ? '100vw' : 0 }}>
        <div style={styles.innerBoxStyles}>
            <input style={styles.inputStyle} value={nameOfPlace} onChange={event => updatePlaceName(event.target.value)} type="text" placeholder="People like to call it as.." />
            <input style={styles.inputStyle} value={addressOfPlace} onChange={event => updatePlaceAddress(event.target.value)} type="text" placeholder="And it's Address is.." />
            <div style={styles.buttonContainer} >
                <button style={styles.buttonStyle} onClick={function () {
                    updatePlaceName('');
                    updatePlaceAddress('');
                    onAddClick(nameOfPlace, addressOfPlace);
                }}>
                    ADD
                </button>
                <button className="close" style={styles.buttonStyle} onClick={onCloseClick}>
                    <i className="fas fa-times"></i>
                </button>
            </div>
        </div>
    </FixedLayer >
}


const styles = {
    innerBoxStyles: {
        width: 320,
        backgroundColor: 'rgba(255, 228, 196,1)',
        padding: 10,
        borderRadius: 5,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    inputStyle: {
        backgroundColor: 'rgba(50, 50, 50, 0.1)',
        padding: 10,
        fontSize: 20,
        border: 0
    },
    buttonContainer: {
        display: 'flex', justifyContent: 'space-between'
    },
    buttonStyle: {
        fontSize: 24,
        fontFamily: 'monospace',
        textShadow: '0px 0px 50px #333',
        transform: 'translateY(2px)',
        color: '#666',
        backgroundColor: 'transparent',
        border: 'none'
    }
}
