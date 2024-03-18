import { useEffect, useState } from 'react';
import domain from './Components/Domain/domain';
import './App.css';
import GameBoard from './Components/GameBoard';
import Leaderboard from './Components/Leaderboard';
import UsernameForm from './Components/Username';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    getTopScorers();
  }, []);

  const getTopScorers = async () => {
    try {
      const response = await axios.get(`${domain.domain}/top-scorers`);
      console.log(response)
      setLeaderboard(response.data);
    } catch (error) {
      console.error('Error fetching top scorers:', error);
    }
  };

  

  return (
    <div>
      {!username ? (
        <UsernameForm setUsername={setUsername} />
      ) : (
        <>
            <GameBoard username={username} getTopScorers={getTopScorers}/>
          <Leaderboard leaderboard={leaderboard} currentUser={username} />
        </>
      )}
    </div>
  );
}

export default App;






