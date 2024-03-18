const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    gamesWon: {
        type: Number,
        default: 0
    }
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
