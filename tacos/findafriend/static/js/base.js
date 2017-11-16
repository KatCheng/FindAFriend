socket = new WebSocket("ws://" + window.location.host + "/chat/");
socket.onmessage = function(e){
	$("#chatmsg")[0].innerHTML = e.data;
	var data = JSON.parse(e.data);
	$("#chatmsg").append('<tr>'
		+ '<td>' + data.timestamp + '</td>'
		+ '<td>' + data.senderName + '</td>'
		+ '<td>' + data.recepientName + '</td>'
		+ '<td>' + data.message + '</td>'
		+ '</tr>');
};

socket.onopen = function() {
//	$("#chat").submit(function(e){
//		e.preventDefault();	
//		socket.send(document.forms["chatContent"]["message"].value);		
//	});
	$("#chatform").submit(function(e){
		e.preventDefault();
		
		var chatmessage = {
			recipientName: recipient,
			messageContent: document.forms["chatContent"]["message"].value,
		}

		console.log(document.forms["chatContent"]["message"].value)
		socket.send(JSON.stringify(chatmessage));
		console.log(chatmessage);
	})
}


if(socket.readyState == WebSocket.OPEN) socket.onopen();
