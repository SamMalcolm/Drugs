
const standardDeck = require('./standardDeck.json');

class Deck {

	shuffle() {

		var currentIndex = this.cards.length, temporaryValue, randomIndex;

		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			temporaryValue = this.cards[currentIndex];
			this.cards[currentIndex] = this.cards[randomIndex];
			this.cards[randomIndex] = temporaryValue;
		}
	}

	draw(count) {
		let cards = this.cards.splice(0, count);
		return cards;
	}

	removeJokers() {
		this.cards = this.cards.filter((card) => { card.value != "JO" })
	}

	constructor(decks = 1) {
		this.cards = [];
		for (let i = 0; i < decks; i++) {
			this.cards.push(...standardDeck)
		}
	}

}

module.exports = Deck;