var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var express = require("express");
var socket_io = require("socket.io");
const session = require('express-session');
const { runInNewContext } = require('vm');
const MemoryStore = require('memorystore')(session);
const GameController = require('./app/game_controller.class');
const Game = require('./app/game.class');


// Express
var app = express();

app.use(session({
	store: new MemoryStore({
		checkPeriod: 86400000
	}),
	secret: 'Tj4W;h4KqU4AAGYieKPLH}Jh',
	cookie: {
		maxAge: 86400000
	},
	resave: false,
	saveUninitialized: false
}));

app.locals.game_controller = new GameController()
// app.use((req, res, next) => {
// 	if (typeof req.game_controller == "undefined") {
// 		req.game_controller = new GameController();
// 	}
// 	next();
// })

// app.dynamicHelpers({
// 	session: function (req, res) {
// 		return req.session;
// 	}
// });


// Socket.io
var io = socket_io();
app.io = io;

const lobby = io.of('/lobby');
const game = io.of('/game');
app.locals.io_lobby = lobby;
app.locals.io_game = game;

lobby.on("connection", socket => {
	socket.on('join', data => {
		socket.join(data.room)
		lobby.in(data.room).emit("msg", { msg: "New Member in " + data.room + " room" })
	})

	socket.on('msg', data => {
		lobby.in(data.room).emit("msg", { msg: data.msg })
	})

	socket.on('start_game', data => {
		let drugs_game = app.locals.game_controller.getGame(data.room)
		drugs_game.startGame();
		lobby.in(data.room).emit("start_game")
	})

	socket.on('disconnect', data => {
		console.log("SOCKET LEFT");
		console.log(data);
	})
});

game.on("connection", socket => {

	socket.on('join', data => {
		let drugs_game = app.locals.game_controller.getGame(data.room)
		socket.join(data.room)
		game.in(data.room).emit("get_players", { players: drugs_game.players })
	})

	socket.on('disconnect', data => {
		console.log("SOCKET LEFT");
		console.log(data);
	})
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/socket.io-client/dist')));

app.use((req, res, next) => {
	if (typeof req.session.messages != "undefined") {
		if (req.session.messages.length) {
			req.messages = req.session.messages;
			req.session.messages = [];
		}
	} else {
		req.session.messages = [];
	}
	next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error', { title: "HTTP Error" });
});




module.exports = app;
