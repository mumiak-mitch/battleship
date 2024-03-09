const Ship = require('./ship');

class Gameboard {
    constructor() {
        this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
        this.ships = [];
        this.missedAttacks = [];
    }

    placeShip(ship, coordinates, isVertical) {
        if (this.isPlacementValid(ship, coordinates, isVertical)) {
            const [startX, startY] = coordinates;
            if (isVertical) {
                for (let i = 0; i < ship.length; i++) {
                    this.board[startX + i][startY] = ship;
                }
            } else {
                for (let i = 0; i < ship.length; i++) {
                    this.board[startX][startY + i] = ship;
                }
            }
            this.ships.push(ship);
            return true;
        }
        return false;
    }

    receiveAttack(coordinates) {
        const [x, y] = coordinates;
        const target = this.board[x][y];

        if (target === null) {
            this.missedAttacks.push(coordinates);
        } else {
            target.hit();
        }
    }

    allShipsSunk() {
        return this.ships.every(ship => ship.isSunk());
    }

    isPlacementValid(ship, coordinates, isVertical) {
        const [startX, startY] = coordinates;

        if (isVertical) {
            if (startX + ship.length > 10) {
                return false; // Ship goes out of the board
            }

            for (let i = 0; i < ship.length; i++) {
                if (this.board[startX + i][startY] !== null) {
                    return false; // Collision with another ship
                }
            }
        } else {
            if (startY + ship.length > 10) {
                return false; // Ship goes out of the board
            }

            for (let i = 0; i < ship.length; i++) {
                if (this.board[startX][startY + i] !== null) {
                    return false; // Collision with another ship
                }
            }
        }

        return true;
    }
}

module.exports = Gameboard;
