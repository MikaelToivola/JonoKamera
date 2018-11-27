'use strict';
//yhyy
const constraints = {audio: true, video: true};

const socket = io.connect('https://10.114.34.26:3000');

socket.on('connect', function () {
    console.log('socket.io connected!');
});
socket.on('disconnect', function () {
    console.log('socket.io connected!');
});

/*const sendMsg = (type, text) => {
    console.log('send msg, type: ' + type);
    let msg = {};
    msg.app_id = this.appName;
    msg.time = Date.now();
    msg.json = 'json';
    socket.json.emit(type, msg);
    socket.emit(type, text);
};*/

const servers = {
    'iceServers': [
        {'urls': 'stun:stun.services.mozilla.com'},
        {'urls': 'stun:stun.l.google.com:19302'},
        {
            'urls': 'turn:numb.viagenie.ca',
            'credential': 'Awesomenumb',//password
            'username': 'mikael.toivola@metropolia.fi',//email
        }
		],
};
const caller = new RTCPeerConnection(servers);
let userName = 'user';


socket.on('candidate', function (data) {
    console.log('got candidate from server: ');
    caller.addIceCandidate(new RTCIceCandidate(JSON.parse(data).candidate));
});

//  ICECANDIDATE
caller.onicecandidate = evt => {
    if (!evt.candidate) return;
    console.log('onicecandidate called');
	console.log(evt);
    onIceCandidate(evt);
};

//Send the ICE Candidate to the remote peer
const onIceCandidate = (evt) => {
    socket.emit('candidate', JSON.stringify({'candidate': evt.candidate}));
};

//onaddstream handler to receive remote feed and show in remoteview video element
caller.onaddstream = evt => {
    console.log('onaddstream called');
	console.log(evt);
	console.log(evt.stream);

	document.getElementById('localVideo2').srcObject = evt.stream;
	//document.getElementById('p1').innerHTML = "test" + evt.stream.id;
};


navigator.mediaDevices.getUserMedia(constraints).then(mediaStream => {
    const video = document.querySelector('#localVideo');
    video.srcObject = mediaStream;
    caller.addStream(mediaStream);
}).catch(err => {
    console.log(err.name + ': ' + err.message);
});

const btnCall = document.querySelector("#btnMakeCall");

btnCall.addEventListener('click', () => {
    caller.createOffer().then(offer => {
        caller.setLocalDescription(new RTCSessionDescription(offer));
		console.log("JSON.stringify(offer)");
		console.log(JSON.stringify(offer));
        socket.emit('call', JSON.stringify(offer)); 
    });
});

socket.on('call', function (data) {
    console.log('got call from server: ');
	console.log(data);
	//let signal = JSON.parse(data);
	caller.setRemoteDescription(new RTCSessionDescription(JSON.parse(data) ));
});



const chatElem = document.getElementById("feedback");

socket.on('chat', function (data) {
	if(data.time > 0){}
	else {
	console.log("Viesti: ");
	console.log(data);
	chatElem.innerHTML +=  data;
	}

});

const btnChat = document.getElementById("btnSendChat");
const input = document.getElementById("message");

const btnUser = document.getElementById("send_username");
const userInput = document.getElementById("username");

btnChat.addEventListener('click', () => {
	let text = "<b><p id='userName'> " + userName + "</p></b>  <p id='message'>" + input.value+"</p> <br>";
	socket.emit('chat', text);
	chatElem.innerHTML +=  text;

});
btnUser.addEventListener('click', () => {
	userName = userInput.value;
	
});






