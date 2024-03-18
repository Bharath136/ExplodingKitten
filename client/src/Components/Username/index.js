import React, { useState } from 'react';
import domain from '../Domain/domain';
import '../index.css';
import axios from 'axios';

const UsernameForm = ({ setUsername }) => {
    const [usernameInput, setUsernameInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setUsername(usernameInput);
        createUser();
    };

    const createUser = async () => {    
        try {
            const response = await axios.post(`${domain.domain}/games`, { username:usernameInput });
            console.log(response);
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="form">
                <h2 className="form-title">Enter Your Username</h2>
                <input
                    type="text"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    placeholder="Username"
                    className="form-input"
                    required
                />
                <button type="submit" className="form-button">Enter Game</button>
            </form>
        </div>
    );
};

export default UsernameForm;
    