import io from 'socket.io-client';
import '../../public/stylesheets/lobby.scss'
var socket = io('/lobby');

socket.on('connect', () => {
	socket.emit('join', {room: window.room_code})
})

socket.on('msg', msg => {
	console.log(msg);
})

const addPlayersToDom = (players) => {
	console.log(players);
	if (typeof players == "string") {
		players = JSON.parse(players);
	}
	let container = document.querySelector(".player_container");
	container.innerHTML = "";
	let html = "<ul>";
	for (let i = 0; i < players.length; i++) {
		html += `
			<li class="${(players[i].host) ? "host" : "player"}">
				<div>
					<h3>${players[i].name}</h3>
				</div>
			</li>`;
	}
	container.innerHTML = html;
}

socket.on("players_update", (players) => {
	addPlayersToDom(players);
})

if (typeof window.players != "undefined") {
	addPlayersToDom(window.players);
}