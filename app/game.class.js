const Deck = require('./deck.class.js');
const Player = require('./player.class.js');
const readline = require('readline');

class Game {

	changeDirection() {
		this.direction = (this.direction == "CW") ? "CCW" : "CW";
	}

	getNextPlayer() {
		let index = this.players.indexOf(this.activePlayer);
		let nextPlayer;
		if (this.direction == "CW") {
			if (typeof this.players[index + 1] !== "undefined") {
				nextPlayer = this.players[index + 1]
			} else {
				nextPlayer = this.players[0];
			}
		} else {
			if (typeof this.players[index - 1] !== "undefined") {
				nextPlayer = this.players[index - 1]
			} else {
				nextPlayer = this.players[this.players.length - 1];
			}
		}
		return nextPlayer;
	}

	dealBottomCards() {
		this.players.forEach((player) => {
			player.bottomCards.push(this.deck.draw(4))
		})
	}

	dealStartingHands() {
		this.players.forEach((player) => {
			player.hand.push(this.deck.draw(8))
		})
	}

	killPile() {
		this.deadCards.push(...this.pile);
		this.pile = [];
	}

	playCard(cards) {
		// if (card.value == "JO") {
		// 	this.deadCards.push(card);
		// 	this.getNextPlayer().hand.push(...this.pile)
		// } else if (card.value == 3) {
		// 	this.changeDirection();
		// } else if (card.value == 10) {
		// 	this.killPile()
		// }
	}

	addPlayer(name, isHost = false) {
		let player = new Player(name, this.players.length, isHost)
		this.players.push(player)
		return player;
	}

	removePlayer(name) {
		let player = this.players.filter((player) => { return player.name == name })
		player = player[0];
		this.players.splice(this.players.indexOf(player), 1)
		return this.players;
	}

	setDeckCount(count) {
		this.decks = count;
	}

	startGame() {

		this.deck = new Deck(this.decks);
		this.currentCardValue == 4;
		this.deck.shuffle();
		this.dealBottomCards();
		this.dealStartingHands();
		this.activePlayer = this.players[0];

	}


	constructor(room_code) {
		this.setDeckCount(1);
		this.pile = [];
		this.deadCards = [];
		this.players = [];
		this.room_code = room_code;
	}
}

module.exports = Game;