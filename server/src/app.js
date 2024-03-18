const express = require('express');
const app = express();
const cors = require('cors');
const port = 9000;
const client = require('../src/database/connection');
const Game = require('./models/schema');

app.use(express.json());
app.use(cors())

app.get('/games', async (req, res) => {
    try {
        const games = await Game.find();
        res.json(games);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/games', async (req, res) => {
    const { username } = req.body;

    try {
        let game = await Game.findOne({ username });

        if (game) {
            game = await Game.findOneAndUpdate(
                { username },
                { $set: { /* Update fields if needed */ } },
                { new: true }
            );
        } else {
            game = new Game({ username });
            await game.save();
        }

        res.status(201).json(game);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.put('/games/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const game = await Game.findOne({ username });
        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }
        game.gamesWon++;
        const updatedGame = await game.save();
        res.json(updatedGame);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.get('/top-scorers', async (req, res) => {
    try {
        const topScorers = await Game.find().sort({ gamesWon: -1 });

        if (!topScorers || topScorers.length === 0) {
            return res.status(404).json({ message: 'Top scorers not found' });
        }
        res.json(topScorers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
