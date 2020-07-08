import io from 'socket.io-client';

var socket = io('/lobby');

socket.on('connect', () => {
	socket.emit('join', {room: window.room_code})
})

socket.on('msg', msg => {
	console.log(msg);
})

const addPlayersToDom = (players) => {
	if (typeof players == "string") {
		players = JSON.parse(players);
	}
	let container = document.querySelector(".player_container");
	container.innerHTML = "";
	let html = "<ul>";
	for (let i = 0; i < players.length; i++) {
		html += `
			<li>
				<div ${(players[i].isHost) ? "host" : "player"}>
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