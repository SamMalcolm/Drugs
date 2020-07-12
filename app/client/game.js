import io from 'socket.io-client';

var socket = io('/game');
var deck = require('../standardDeck.json');
var card_back = "🂠";

var player_id = window.location.search.match(/[\d]/)[0];
player_id = parseInt(player_id);

var room_code = window.location.pathname.slice(6, window.location.pathname.length);

console.log(room_code);
console.log(player_id)


socket.on('connect', () => {
	socket.emit('join', { room: room_code })
})

const handlePlayers = players => {
	console.log(players);
}

socket.on('get_players', data => {
	handlePlayers(data.players);
})
