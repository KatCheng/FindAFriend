socket = new WebSocket("ws://" + window.location.host + "/chat/");
socket.onmessage = function(e){
	document.getElementById("chatbox").innerHTML = e.data;	
}

socket.onopen = function() {
	socket.send("Hi there");
}

if(socket.readyState == WebSocket.OPEN) socket.onopen();
