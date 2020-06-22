const Deck = require('./deck.class.js');
const Player = require('./player.class.js');

class Game {
	changeDirection() {
		this.direction = (this.direction == "CW") ? "CCW" : "CW";
	}

	nextTurn() {
		let index = this.players.indexOf(this.activePlayer)
		if (this.direction == "CW") {
			if (typeof this.players[index + 1] !== "undefined") {
				this.activePlayer = this.players[index + 1]
			} else {
				this.activePlayer = this.players[0];
			}
		} else {
			if (typeof this.players[index - 1] !== "undefined") {
				this.activePlayer = this.players[index - 1]
			} else {
				this.activePlayer = this.players[this.players.length - 1];
			}
		}

	}

	dealBottomCards() {
		this.players.forEach((player) => {
			player.bottomCards.push(this.deck.draw(4))
		})
	}


	constructor(decks = 1, players = ["name", "name2"]) {

		this.players = [];
		this.deck = new Deck(decks);

		for (let i = 0; i < players.length; i++) {
			this.players.push(new Player(players[i], i))
		}

		this.deck.shuffle();
		this.dealBottomCards();
		this.activePlayer = this.players[0];
		console.log(this.activePlayer.bottomCards);


	}
}

module.exports = Game;