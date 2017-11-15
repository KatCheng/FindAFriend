socket = new WebSocket("ws://" + window.location.host + "/chat/");
socket.onmessage = function(e){
	$("#chatmsg")[0].innerHTML = e.data;
}

socket.onopen = function() {
	$("#chat").submit(function(e){
		e.preventDefault();	
		socket.send(document.forms["chatContent"]["message"].value);		
	});


}


if(socket.readyState == WebSocket.OPEN) socket.onopen();
