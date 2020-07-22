import io from 'socket.io-client';
import '../../public/stylesheets/game.scss'
var socket = io('/game');
var deck = require('../standardDeck.json');
var card_back = "/images/standard/back.svg";

var player_id = window.location.search.match(/[\d]/)[0];
player_id = parseInt(player_id);

var room_code = window.location.pathname.slice(6, window.location.pathname.length);

console.log(room_code);
console.log(player_id)


socket.on('connect', () => {
	socket.emit('join', { room: room_code })
})

const calculateImagePath = (card) => {
	let path = "/images/standard/"

	let val = '';
	let suit = '';
	let special = '';

	suit = card.suit;
	suit = suit.toUpperCase();
	suit = suit.slice(0, suit.length - 1);

	if (typeof card.value == "string") {
		switch (card.value) {
			case 'J':
				val = '11'
				special = 'JACK'
				break;
			case 'Q':
				val = '12'
				special = 'QUEEN'
				break;
			case 'K':
				val = '13'
				special = 'KING'
				break;
			case 'A':
				val = '1'
				break;

			case 'JO':
				suit = ''
				val = ''
				if (suit == 'RE') {
					special = 'JOKER-3'
				} else if (suit == "BLAC") {
					special = 'JOKER-2'
				}
				break;
		}
	} else {
		val = card.value
	}
	let res = [];
	if (suit) { res.push(suit) }
	if (val) { res.push(val) }
	if (special) { res.push(special) }
	res = res.join('-')
	return path + res
}

const handlePlayers = players => {
	let current_player = players.filter((player) => { return player.position == player_id })[0]
	console.log(current_player);
	let hand = document.querySelector(".hand");
	for (let i = 0; i < current_player.hand[0].length; i++) {
		let html = ""
		html += "<input type=\"checkbox\" value=\"" + i + "\" class=\"card\" id=\"card" + i + "\" />";
		html += "<label style=\"width:calc(100% / " + current_player.hand[0].length + ")\" for=\"card" + i + "\" >";
		html += "<img src=\"" + calculateImagePath(current_player.hand[0][i]) + '.svg\" />'
		html += "</label>"
		console.log(html);
		hand.innerHTML += html
	}
}

socket.on('get_players', data => {
	handlePlayers(data.players);
})
