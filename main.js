const readlineSync = require('readline-sync');
const Ship = require('./ship');
const Gameboard = require('./gameboard');
const Player = require('./player');

// Set up game
const playerBoard = new Gameboard();
const computerBoard = new Gameboard();
const player = new Player('Player');
const computer = new Player('Computer');

// Place ships
placeShipsRandomly(playerBoard);
placeShipsRandomly(computerBoard);

// Game loop
while (!playerBoard.allShipsSunk() && !computerBoard.allShipsSunk()) {
    // Player's turn
    const playerMove = getUserMove();
    player.attack(computerBoard, playerMove);

    // Computer's turn
    const computerMove = getComputerMove();
    computer.attack(playerBoard, computerMove);
}

// Determine the winner
const winner = playerBoard.allShipsSunk() ? 'Computer' : 'Player';
console.log(`${winner} wins!`);

// Functions

// Place ships randomly on the board
function placeShipsRandomly(board) {
    const shipLengths = [5, 4, 3, 3, 2]; // Example ship lengths
    for (const length of shipLengths) {
        let placed = false;
        while (!placed) {
            const isVertical = Math.random() < 0.5;
            const startX = Math.floor(Math.random() * 10);
            const startY = Math.floor(Math.random() * 10);
            const newShip = new Ship(length);
            placed = board.placeShip(newShip, [startX, startY], isVertical);
        }
    }
}

// Get user input for coordinates
function getUserMove() {
    const input = readlineSync.question('Enter your move (e.g., A1): ');
    const [col, row] = input.toUpperCase().split('');
    const x = col.charCodeAt(0) - 'A'.charCodeAt(0);
    const y = parseInt(row, 10) - 1;
    return [x, y];
}

// Implement basic AI logic for computer's turn
function getComputerMove() {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    return [x, y];
}