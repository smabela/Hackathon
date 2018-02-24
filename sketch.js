//slider things
var main_canvas;

//location stettings
var startx=150;
var starty=150;

var faces = [];

function setup () {

 main_canvas = createCanvas(300, 300);

  //iterates a set amount of times and adds new face traits to the array of faces which are randomized in the randomThings function
  	faces.push(
  		{
  		eyeSize : 0,
			eyeWidth : 0,
			eyeColour : '#bf8040',

			pettalLength : 0,
			pettalWidth : 0,
			pettalColour : '#e6ffff',
			pettalSpacing : 15,

			mouth : false,

			centerColour : '#ffffcc',
			centerSize : 100,

  		}
  	);


  randomThings(); // initialise them all Random



}


function draw () {

	clear();
	background('#b3ffb3');
	//background('#80e5ff');

	var i = 0;
	drawFace(startx, starty, i);

}



function drawFace(x,y,i){
	//uses i to find the correct index of the faces array, which holds a set amount of faces that are initialised in the setup method

		drawPettal(startx, starty, faces[i].pettalSpacing, faces[i].pettalWidth, faces[i].pettalLength, faces[i].pettalColour); //remove the y
		drawCenter(startx,starty,faces[i].centerSize,faces[i].centerColour);
		drawEyes(startx, starty,faces[i].eyeWidth,faces[i].eyeSize,faces[i].eyeColour);
		drawStem(startx,starty,250,500, 60);
		drawMouth(startx,starty, faces[i].pettalColour,faces[i].mouth,faces[i].centerSize);
		drawKawaii();

}

function randomThings(){

	// for each faces, randomize it's features
	for(i = 0; i < faces.length; i++){
		randomMouth = focusedRandom(0,2,1,1);
		faces[i].mouth = randomMouth >1 ;
		faces[i].eyeSize = focusedRandom(20,70, 1, 50);
		faces[i].eyeWidth = focusedRandom(25,45,1,25);
		faces[i].pettalLength = focusedRandom(87,170, 1,100);
		faces[i].pettalWidth = focusedRandom(30,100);
		faces[i].pettalColour = getRandomColor();

	}

}

function drawMouth(X,Y,colour, smile, size){
	push();
	translate(X,Y);
	angleMode(RADIANS);
	stroke(colour);
	if(smile){
		fill(colour);
	}
	else{
		noFill();
	}

arc(0,size/5,size/5,size/5, 0, PI);
 angleMode(DEGREES);
 pop();
}

function drawEyes(X,Y,width,size,colour){
push();
	translate(X,Y);
	noStroke();
	fill(colour);
	if (width<30 && size>30){
		size = size -35;
	}
	ellipse(width,0,size,size);
	ellipse(-width,0,size,size);

	drawKawaii(width,size/9);


pop();
}

function drawKawaii(width,size){

	fill('#ffffff');
	noStroke(0);
	ellipse(width, -size*3.5, size,size);
	ellipse(-width,-size*3.5,size,size);

	ellipse(width+size*2, -size*2, size,size);
	ellipse(-width+size*2,-size*2,size,size);

	ellipse(width, -size*1.5, size*1.5,size*1.5);
	ellipse(-width,-size*1.5,size*1.5,size*1.5);

}


function drawCenter(X,Y,size, colour){
	push();
	noStroke();
	fill(colour);
	translate(X,Y);
ellipse(0,0,size,size);
pop();

}
function drawStem(X1,Y1,X2,Y2, curve){
	stroke('#009933');
	//curve(X1,Y1,450,450,X2,Y2); ///////////I DONT KNOW WHY THIS DOESNT WORK GAAA

}
function drawPettal(X, Y, spacing, width, length,colour){
	push();
	translate(X, Y);
	fill(colour);
	noStroke();
	for (var i = 0; i < 10; i ++) {
	    ellipse(0, spacing, width, length);
	    rotate(180/5);
	  }
	pop();
}



//taken FROM http://stackoverflow.com/questions/1484506/random-color-generator-in-javascript
function getRandomColor() {
  var colors = ['#FE2712', '#FB9902', '#FCCC1A', '#FEFE33', '#347C98', '#0247FE', '#4424D6', '#8601AF'];
  // var colors = ['#090806', '#B7A69E', '#FFF5E1', '#DEBC99', '#B55239', '#91553D', '#4E433F', '#6A4E42'];
    return colors[Math.floor(Math.random()*7)];
}
