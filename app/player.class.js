class Player {

	addToTopCards(card) {
		if (this.topCards.length <= 3) {
			this.topCards.push(card);
		} else {
			console.error("Only 4 top cards");
		}
	}

	constructor(name, position, isHost = false) {
		this.name = name;
		this.position = position;
		this.hand = [];
		this.bottomCards = [];
		this.topCards = [];
		this.host = isHost;
	}
}

module.exports = Player