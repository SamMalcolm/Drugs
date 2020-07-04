class GameController {

	addGame(game) {
		this.games.push(game)
	}

	removeGame(room_code) {
		let game = getGame(room_code);
		this.games.splice(this.games.indexOf(game), 1)
	}

	getGame(room_code) {
		let game = this.games.filter((game) => { return game.room_code == room_code });
		if (game.length) {
			return game[0];
		} else {
			return false;
		}
	}

	constructor() {
		this.games = [];
	}
}

module.exports = GameController;