class Player {
    constructor(name) {
        this.name = name;
    }

    attack(enemyBoard, coordinates) {
        enemyBoard.receiveAttack(coordinates);
    }
}

module.exports = Player;
