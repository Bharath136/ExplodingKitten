import React from 'react';
import '../index.css';

const Leaderboard = ({ leaderboard, currentUser }) => {
    
    return (
        <div className="leaderboard-container">
            <h2 className="leaderboard-title">Leaderboard</h2>
            <ul className="leaderboard-list">
                {leaderboard.map((each) => (
                    <li key={each._id} className="leaderboard-item"><strong>{each.username}{currentUser === each.username && ' (You)'}: </strong> {each.gamesWon} games won</li>
                ))}
            </ul>
        </div>
    );
};

export default Leaderboard;
