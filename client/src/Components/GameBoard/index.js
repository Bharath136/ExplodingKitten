import React, { useState, useEffect } from 'react';
import axios from 'axios';
import domain from '../Domain/domain';
import '../index.css';

const cards = [
    { icon: '😼', name: 'Cat' },
    { icon: '🙅‍♂️', name: 'Defuse' },
    { icon: '🔀', name: 'Shuffle' },
    { icon: '💣', name: 'Bomb' },
    { icon: '🎲', name: 'Random' }
];

const GameBoard = ({ username, getTopScorers }) => {
    const [deck, setDeck] = useState([]);
    const [drawnCard, setDrawnCard] = useState(null);
    const [wonGame, setWonGame] = useState(false);

    useEffect(() => {
        fetchDeck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchDeck = async () => {
        try {
            const shuffledDeck = shuffleDeck([...cards]);
            setDeck(shuffledDeck);
            setDrawnCard(null);
            setWonGame(false);
        } catch (error) {
            console.error('Error fetching deck:', error);
        }
    };

    const drawCard = () => {
        if (deck.length === 0) return;

        const randomIndex = Math.floor(Math.random() * deck.length);
        const drawnCard = deck[randomIndex];
        setDrawnCard(drawnCard);

        const updatedDeck = [...deck.slice(0, randomIndex), ...deck.slice(randomIndex + 1)];
        setDeck(updatedDeck);

        switch (drawnCard.icon) {
            case '💣':
                setWonGame(false);
                break;
            case '🙅‍♂️':
                setDeck(updatedDeck.filter(card => card.icon !== '💣'));
                break;
            case '🔀':
                fetchDeck();
                break;
            default:
                break;
        }

        if (updatedDeck.length === 0) {
            setWonGame(true);
            updateScore();
        }
    };

    const updateScore = async () => {
        try {
            await axios.put(`${domain.domain}/games/${username}`);
        } catch (error) {
            console.error('Error updating user score:', error);
        }
    };

    const shuffleDeck = (deck) => {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        return deck;
    };

    const restartGame = () => {
        fetchDeck();
        getTopScorers();
    };

    return (
        <div className="game-board-container">
            <h1 className="game-title">Exploding Kitten</h1>
            <p>Player: <strong>{username}</strong></p>
            <div className="card-container">
                {deck.map((card, index) => (
                    <div key={index} className={`card ${card === drawnCard ? 'selected' : ''}`}>
                        <span role="img" aria-label={card.name}>{card.icon}</span> {card.name}
                    </div>
                ))}
            </div>
            {!wonGame && (
                <button className="draw-card-button" onClick={drawCard} disabled={wonGame || (drawnCard && drawnCard.name === 'Bomb')}>
                    Draw Card
                </button>
            )}

            {(wonGame || (drawnCard && drawnCard.name === 'Bomb')) && (
                <button className="restart-button" onClick={restartGame}>
                    Restart Game
                </button>
            )}


            {drawnCard && <div>
                <h3>Drawn Card</h3>
                <div className="card"><span role="img" aria-label={drawnCard.name}>{drawnCard.icon}</span> {drawnCard.name}</div>
            </div>}
            {!wonGame && drawnCard && drawnCard.icon === '💣' && <h2 className="lose-message">You lose the game! Better luck next time!</h2>}
            {wonGame && <h2 className="win-message">Congratulations! You won the game!</h2>}
        </div>
    );
};

export default GameBoard;
