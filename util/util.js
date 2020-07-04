const games = [];

const addGame = game => {
	games.push(game);
}

const removeGame = room_code => {
	let game = getGame(room_code);
	game.splice(games.indexOf(game), 1)
}

const getGame = room_code => {
	game = games.filter((game) => { return game.room_code == room_code });
	return game
}

module.exports = {
	addGame,
	removeGame,
	getGame
}