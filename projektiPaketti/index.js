const express = require('express');
const https = require('https');
const fs = require('fs');

const sslkey = fs.readFileSync('ssl-key.pem');
const sslcert = fs.readFileSync('ssl-cert.pem');

const options = {
      key: sslkey,
      cert: sslcert
};

// Create Node Server
const app = express();
const server = https.createServer(options, app);

app.use(express.static('public'));

server.listen(3000);

app.get('/', (req, res) => {
  res.send('Hello Secure World!');
});

const http = require('http');

http.createServer((req, res) => {
      res.writeHead(301, { 'Location': 'https://localhost:3000' + req.url });
      res.end();
}).listen(8080);


// Call Java 
const url = "http://169.254.170.49"; //Camera Url
const CamCount = 2; //Amount of Cameras in use

setInterval( () => {

const exec = require('child_process').exec;

for(CamId=1; CamId< CamCount + 1; CamId++){

	//Call jar for Camera "CamId"
	let child = exec('java -jar  ..\\JonoProjekti\\public\\java\\Jonokamera.jar '+ CamId + ' ' + url + '/jpg/' + CamId + '/image.jpg', 

		  function (error, stdout, stderr){
			console.log('Output -> ' + stdout);
			if(error !== null){
			  console.log("Error -> "+error);
			}
		});
		 
		module.exports = child;
}
	
}, 5000);//refreshTime
