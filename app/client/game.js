import io from 'socket.io-client';
import '../../public/stylesheets/game.scss'
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
	let current_player = players.filter((player) => { return player.position == player_id })[0]
	console.log(current_player);
	let hand = document.querySelector(".hand");
	for (let i = 0; i < current_player.hand[0].length; i++) {
		let html = ""
		html += "<input type=\"checkbox\" value=\"" + i + "\" class=\"card\" id=\"card" + i + "\" />";
		html += "<label for=\"card" + i + "\" style=\"";
		html += (current_player.hand[0][i].suit == "diamonds" || current_player.hand[0][i].suit == "hearts") ? 'color:red;' : 'color:black;';
		html += "\">";
		html += current_player.hand[0][i].character;
		html += "</label>"
		console.log(html);
		hand.innerHTML += html

	}
}

socket.on('get_players', data => {
	handlePlayers(data.players);
})
