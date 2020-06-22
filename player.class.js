class Player {
	constructor(name, position) {
		this.name = name;
		this.position = position;
		this.hand = [];
		this.bottomCards = [];
		this.topCards = [];
	}
}

module.exports = Player