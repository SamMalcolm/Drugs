import io from 'socket.io-client';
import '../../public/stylesheets/lobby.scss'
var socket = io('/lobby');

socket.on('connect', () => {
	socket.emit('join', { room: window.room_code })
})

socket.on('msg', msg => {
	console.log(msg.msg);
})

socket.on('start_game', () => {

	window.location.assign(window.location.origin + "/game/" + window.room_code + '?pid=' + window.current_player.position);

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
	if (window.current_player.host && players.length >= 2 && !document.querySelector(".start")) {
		addStartButton();
	}
	socket.emit("msg", { room: window.room_code, msg: "This is a message" })
}

const addStartButton = () => {
	let btn = document.createElement("button");
	btn.classList.add("start");
	btn.appendChild(document.createTextNode("Start Game"));
	document.querySelector(".drugs_container").appendChild(btn);

	btn.addEventListener("click", (e) => {
		e.preventDefault();
		e.stopPropagation();
		socket.emit('start_game', { room: window.room_code })
	})
}

socket.on("players_update", (players) => {
	addPlayersToDom(players);
})

if (typeof window.players != "undefined") {
	addPlayersToDom(window.players);
}