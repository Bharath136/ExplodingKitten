// Card.js
import React from 'react';

const Card = ({ type }) => {
    let cardText;
    switch (type) {
        case 'cat':
            cardText = '😼 Cat Card';
            break;
        case 'defuse':
            cardText = '🙅‍♂️ Defuse Card';
            break;
        case 'shuffle':
            cardText = '🔀 Shuffle Card';
            break;
        case 'bomb':
            cardText = '💣 Exploding Kitten Card';
            break;
        default:
            cardText = 'Unknown Card';
    }

    return (
        <div>{cardText}</div>
    );
};

export default Card;

    