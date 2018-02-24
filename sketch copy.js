//flower
//Phoebe Zeller
//300309856

//slider things
var main_canvas;



var randomEyeSize;
var randomEyeWidth;
var randomPettalLength;
var randomPettalWidth;
var randomMouth


//location stettings
var startx;
var starty;

//pettal things
var pettalSpacing = 15;
var pettalLength = 125;
var pettalWidth = 40;
var pettalColour = '#e6ffff';

//center things
var centerColour = '#ffffcc';
var centerSize = 100;
//eye things
var eyeSize = 45;
var eyeWidth = 30;
var eyeColour = '#bf8040';

//smiley mouth or no smiley mouth
var fillMouth = false;

//number of faces in array
var faces = [];
var totalRows = 1;
var totalCols = 1;

//sway code THIS IS FROM THE PROCESSING SIGN WAVE REFFERENCE
var xspacing = 960/totalCols;    // Distance between each horizontal location
var w;                // Width of entire wave
var theta = 0.0;      // Start angle at 0
var amplitude = 10.0; // Height of wave
var period = 500.0;   // How many pixels before the wave repeats
var dx;               // Value for incrementing x
var yvalues;  // Using an array to store height values for the wave



function setup () {


 main_canvas = createCanvas(960, 500);

	  w = width+16;
	  dx = (TWO_PI / period) * xspacing;
	  yvalues = new Array(floor(w/xspacing));
  angleMode(DEGREES); // for the sliders, they like degrees (me too, id like mine now)


  //iterates a set amount of times and adds new face traits to the array of faces which are randomized in the randomThings function
  for( i = 0; i < totalRows*totalCols; i++){
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
  }



  //button = createButton('random');
 // button.mousePressed(randomThings);
  randomThings(); // initialise them all Random
 // button.position(10, 10);


  // position each element on the page
  main_canvas.parent('canvasContainer');




}


function draw () {

	clear();
	background('#b3ffb3');
	//background('#80e5ff');
  	starty = -100 - width/12;
	//randomThings(); // this is just a setter

	var i = 0;
	for( var rows = 0; rows < totalRows; rows++){
		startx = -100 - width/12;
		starty += width/totalRows/2;
		for(var cols = 0; cols < totalCols; cols++){
			startx += width/totalCols;
			drawFace(startx,starty, i);
			i++;
		}
	}
	calcSway();
}



function calcSway(){

	angleMode(RADIANS);
	// Increment theta (try different values for
  // 'angular velocity' here
  theta += 0.00;

  // For every x value, calculate a y value with sine function
  var x = theta;
  for (var i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x)*amplitude;
    x+=dx;
  }
  angleMode(DEGREES);
}


function drawFace(x,y,i){
	//uses i to find the correct index of the faces array, which holds a set amount of faces that are initialised in the setup method

		drawPettal(startx + yvalues[Math.floor(i/5)], starty, faces[i].pettalSpacing, faces[i].pettalWidth, faces[i].pettalLength, faces[i].pettalColour); //remove the y
		drawCenter(startx + yvalues[Math.floor(i/5)],starty,faces[i].centerSize,faces[i].centerColour);
		drawEyes(startx + yvalues[Math.floor(i/5)], starty,faces[i].eyeWidth,faces[i].eyeSize,faces[i].eyeColour);
		drawStem(startx + yvalues[Math.floor(i/5)],starty,250,500, 60);
		drawMouth(startx + yvalues[Math.floor(i/5)],starty, faces[i].pettalColour,faces[i].mouth,faces[i].centerSize);
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

function drawMouth(X,Y,colour, smile,size){
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

function mouseClicked() {

  randomThings();
}

function keyTyped() {
  if (key == '!') {
    saveBlocksImages();
  }
}


//taken FROM http://stackoverflow.com/questions/1484506/random-color-generator-in-javascript
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
