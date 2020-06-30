class Player {

	addToTopCards(card) {
		if (this.topCards.length <= 3) {
			this.topCards.push(card);
		} else {
			console.error("Only 4 top cards");
		}
	}

	constructor(name, position, ip) {
		this.ip = ip;
		this.name = name;
		this.position = position;
		this.hand = [];
		this.bottomCards = [];
		this.topCards = [];
	}
}

module.exports = Player