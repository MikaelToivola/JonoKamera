const image = document.getElementById("rendered");
let camNumb = 1;

const leppa = document.getElementById("leppavaaraNappi");
const myyr = document.getElementById("myyrmakiNappi");
//const mylly = document.getElementById("myllypuroNappi");
//const arab = document.getElementById("arabiaNappi");

setInterval( () => {

	loadImage();
}, 4000);


const loadImage = () => {
	//Get image with URL. ?Math.random forces to load new image
	const source = "/images/renderedImg"+camNumb+".jpg?" + Math.floor(Math.random() * 10000);
	//console.log("source " + source);
	image.src = source;
	
}

leppa.addEventListener("click", ()=> {
	
	camNumb = 1
	loadImage();
	console.log(camNumb);
	});
	
myyr.addEventListener("click", ()=> {
	
	camNumb = 2
	loadImage();
	console.log(camNumb);
	});


