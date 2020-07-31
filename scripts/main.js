
document.addEventListener('DOMContentLoaded', ()=>{
const grid = document.querySelector('.grid');
let squares = Array.from(document.querySelectorAll('.grid div'));
const width = 10;
const scoreDisplay = document.querySelector('#score');
const startBtn = document.getElementById('start-button');
const pauseBtn = document.getElementById('pause-button');
let nextRandom = 0;
let timerId;
let score = 0;


const lTetromino = [
[1, width+1, width*2+1, 2],
[width, width+1, width+2, width*2+2],
[1, width+1, width*2+1, width*2],
[0, width, width+1, width+2]
];

const sTetromino = [
[width+1, width+2, width*2, width*2+1],
[1, width+1, width+2, width*2+2],
[width+1, width+2, width*2, width*2+1],
[1, width+1, width+2, width*2+2],
];

const tTetromino = [
[1, width, width+1, width+2],
[1, width+1, width+2, width*2+1],
[width, width+1, width+2, width*2+1],
[1, width, width+1, width*2+1]
];

const iTetromino = [
[1, width+1, width*2+1, width*3+1],
[width, width+1, width+2, width+3],
[1, width+1, width*2+1, width*3+1],
[width, width+1, width+2, width+3]
];

const oTetromino = [
[0, 1, width, width+1],
[0, 1, width, width+1],
[0, 1, width, width+1],
[0, 1, width, width+1]
];

const zTetromino = [
[width, width+1, width*2+1, width*2+2],
[2, width+1, width+2, width*2+1],
[width, width+1, width*2+1, width*2+2],
[2, width+1, width+2, width*2+1]
];

const jTetromino = [
[0, 1, width+1, width*2+1],
[width, width+1, width+2, 2],
[1, width+1, width*2+1, width*2+2],
[width*2, width, width+1, width+2]
];

const colors = ['orange', 'green', 'red', 'purple', 'blue', 'violet', 'teal'];
const theTetrominoes = [lTetromino, sTetromino, tTetromino, iTetromino, oTetromino, zTetromino, jTetromino];



let currentPosition = 4;
let currentRotation = 0;
let random = Math.floor(Math.random()*theTetrominoes.length);
let current = theTetrominoes[random][currentRotation];




function draw(){
	current.forEach(index => {
	   squares[currentPosition + index].style.backgroundColor = colors[random];
	});
}

function undraw(){
	current.forEach(index => {
	   squares[currentPosition + index].style.backgroundColor = '';
});
}


function control(e){
	if(e.keyCode === 37){shiftLeft();}
	if(e.keyCode === 39){shiftRight();}
	if(e.keyCode === 40){shiftDown();}
	if(e.keyCode === 32){rotate();}
}

document.addEventListener('keydown', control);


function moveDown(){
	undraw();
	currentPosition += width; 
	draw();
	freeze();
}

function freeze(){
	if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
	current.forEach(index => squares[currentPosition + index].classList.add('taken'))
	random = nextRandom;
	nextRandom = Math.floor(Math.random()*theTetrominoes.length);
	current = theTetrominoes[random][currentRotation];
	currentPosition = 4;
	draw();
	displayShape();
	addScore();
	gameOver();
	}
}

function shiftLeft(){
	undraw();
	const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);
	
	if(!isAtLeftEdge){currentPosition -= 1;}
	if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
	currentPosition += 1;
	};
	draw();
}

function shiftRight(){
	undraw();
	const isAtRightEdge = current.some(index => (currentPosition + index) % width === width-1);

	if(!isAtRightEdge){currentPosition += 1;}
	if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
	currentPosition -= 1;
	};
	draw();
}

function shiftDown(){
	undraw();
	const isAtBottomEdge = current.some(index => squares[currentPosition + index].classList.contains('taken'))
	
	if(!isAtBottomEdge){currentPosition += width;}
	if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){

	currentPosition -= width;
	};
	draw();
}

function rotate(){
	undraw();
	currentRotation++
	if(currentRotation == current.length){currentRotation = 0;}
	current = theTetrominoes[random][currentRotation];
	draw();
}



const displaySquares = document.querySelectorAll('.mini-grid div');
const displayWidth = 4;
const displayIndex = 0;


const upNextTetrominoes = [
[1, displayWidth+1, displayWidth*2+1, 2],
[displayWidth+1, displayWidth+2, displayWidth*2, displayWidth*2+1],
[1, displayWidth, displayWidth+1, displayWidth+2],
[1, displayWidth+1, displayWidth*2+1, displayWidth*3+1],
[0, 1, displayWidth, displayWidth+1],
[displayWidth, displayWidth+1, displayWidth*2+1, displayWidth*2+2],
[0, 1, displayWidth+1, displayWidth*2+1]
];

 function displayShape(){
	displaySquares.forEach(square => {
	   square.style.backgroundColor = '';
	});
	upNextTetrominoes[nextRandom].forEach(index => {
	   displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom];
	});
}


startBtn.addEventListener('click', () => {
	if(timerId){
	location.reload();
	} else {
	   draw();
	   timerId = setInterval(moveDown, 1000);
	   nextRandom = Math.floor(Math.random()*theTetrominoes.length);
	   //if(!displaySquares.some(square => square.classList == "tetromino")){}
	   //else{displayShape();}
	   displayShape();
	}
});

pauseBtn.addEventListener('click', () => {
	if(timerId){
	   clearInterval(timerId);
	   timerId = null;
	} else {
	   draw();
	   timerId = setInterval(moveDown, 1000);
	   nextRandom = Math.floor(Math.random()*theTetrominoes.length);
	   //if(!displaySquares.some(square => square.classList == "tetromino")){}
	   //else{displayShape();}

	}
});



function addScore(){
	for(let i = 0; i < 199; i+=width){
	   const row = [i,i+1,i+2,i+3,i+4,i+5,i+6,i+7,i+8,i+9];

	  if(row.every(index => squares[index].classList.contains('taken'))){
	  score += 10;
	  scoreDisplay.innerHTML = score;
	  row.forEach(index=> {
	   squares[index].classList.remove('taken');
	   squares[index].style.backgroundColor = '';
	   });
	  const squaresRemoved = squares.splice(i, width);
	   squares = squaresRemoved.concat(squares);
	squares.forEach(cell => grid.appendChild(cell));
	}//if
	}//for
}


function gameOver(){
	if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
	scoreDisplay.innerHTML = 'Game Over';
	clearInterval(timerId);
	}
	if(score >= 50){alert("You Win!"); location.reload();}
}








});




