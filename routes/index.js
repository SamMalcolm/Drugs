var express = require('express');
var router = express.Router();
var Game = require("../app/game.class");
const title = 'Drugs';

router.get('/', function (req, res, next) {
	res.render('index', { title: title });
});

router.get('/join', function (req, res, next) {
	res.render('join', { title: title + ' | Join', messages: req.messages });
});



router.post('/room/create', (req, res, next) => {

	let name = req.body.name;
	let room_code = req.body.room_code;

	let game = new Game(room_code);
	let player_id = game.addPlayer(name, true);
	req.app.locals.game_controller.addGame(game);

	req.session.room_code = room_code;
	req.session.player_id = player_id;

	res.redirect('/room/lobby');
})

router.post('/room/join', (req, res, next) => {
	let messages = [];

	let name = req.body.name;
	let room_code = req.body.room_code;

	let game = req.app.locals.game_controller.getGame(room_code);

	if (!game) {
		let message = {};
		message.type = "error";
		message.text = "Room doesnt exist: Room code: " + room_code;
		messages.push(message);
		req.session.messages = messages;
		res.redirect('/join')
	} else {
		let id = game.addPlayer(name);
		req.session.room_code = room_code;
		req.session.player_id = id;
		req.session.name = name;
		console.log("EMITTING PLAYERS UPDATE")
		req.app.locals.io_lobby.in(room_code).emit('players_update', game.players)
		res.redirect('/room/lobby');
	}

})

router.get('/room/lobby', (req, res, next) => {

	let game = req.app.locals.game_controller.getGame(req.session.room_code);

	if (!game) {
		res.redirect("/")
	}

	res.render("room", { title: title + " | " + game.room_code, players: game.players, room_code:game.room_code })

})

router.get('/host', function (req, res, next) {
	res.render('host', { title: title + ' | Host' });
});

router.get('/about', function (req, res, next) {
	res.render('about', { title: title + ' | About' });
});

router.get('/game/:game_id', (req, res, next) => {
	res.render('game', { title: title + ' | Game' })
})


router.get('/test', (req, res) => {
	console.log(req);
	res.render("<h1>check console</h1>");
})

module.exports = router;
