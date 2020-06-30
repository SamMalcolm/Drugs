var express = require('express');
var router = express.Router();

const title = '💉 Drugs 💉';

router.get('/', function (req, res, next) {
	res.render('index', { title: title });
});

router.get('/join', function (req, res, next) {
	res.render('join', { title: title + ' | Join' });
});

router.get('/host', function (req, res, next) {
	res.render('host', { title: title + ' | Host' });
});

router.get('/game/:game_id', (req, res, next) => {
	res.render('game', { title: title + ' | Game' })
})

module.exports = router;
