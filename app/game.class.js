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

	turn() {
		let cardsPlayable = this.calculateLegalMoves()

		this.playCard(cardsPlayable[0])

		while (this.deck.length && this.activePlayer.hand.length < 4) {
			this.activePlayer.hand.push(this.deck.draw(1))
		}
		this.activePlayer = this.getNextPlayer();
		this.nextTurn();
	}

	killPile() {
		this.deadCards.push(...this.pile);
		this.pile = [];
	}

	playCard(card) {

		if (card.value == "JO") {
			this.deadCards.push(card);
			this.getNextPlayer().hand.push(...this.pile)
		} else if (card.value == 3) {
			this.changeDirection();
		} else if (card.value == 10) {
			this.killPile()
		}
	}

	startGame() {


	}


	constructor(decks = 1, players = ["name", "name2"]) {

		this.players = [];
		this.deck = new Deck(decks);

		for (let i = 0; i < players.length; i++) {
			this.players.push(new Player(players[i], i))
		}

		this.currentCardValue == 4;

		this.deck.shuffle();

		this.pile = [];
		this.deadCards = [];

		this.dealBottomCards();
		this.dealStartingHands();

		this.activePlayer = this.players[0];

	}
}

module.exports = Game;