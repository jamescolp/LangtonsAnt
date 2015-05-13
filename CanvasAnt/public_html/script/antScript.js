/* 
 Created on     : 18-Apr-2015
 Last modified  : 08-May-2015
 Author         : James Colp
 */
var ctx;
var direction;
var moveCounter;
var antx;
var anty;

//functionality modifiers
var offset      = 20;
var blkSize     = 6;
var moveSpeed   = 1;
var numMoves    = 0;

$(document).ready(function () {

        initUI();// buttons
        startAnt();// ant
});

function randomCanv(){
    var imgd = ctx.getImageData(antx, anty, 1, 1);
    var data = imgd.data;
    var bool = Math.floor((Math.random() * 1));
    var clrVal = (bool===1)? 255:0;
    
    for (var i = 0; i < data.length; i += 4) {
      data[i]     = clrVal; // red
      data[i + 1] = clrVal; // green
      data[i + 2] = clrVal; // blue
    }
    ctx.putImageData(imgd, 0, 0);
  };
    
    
    


function initUI(){
    
    //reset button
    $("#reset").click(function(){
            startAnt();
        });
}
function startAnt(){
        numMoves = 0;
        resetCanvas();
        //point in random direction
        direction = new Direction(Math.floor((Math.random() * 3)));
        moveCounter = $('#counter');
        run();
}

function run() {
    
     antx = Math.floor((Math.random() * 800)+100);
     anty = Math.floor((Math.random() * 400)+100);
    

    var interval = setInterval(function () {

        moveAnt();
        numMoves++;

        if (numMoves % 100 === 0) {
            moveCounter.html(numMoves);
        }

        if (antx <= 5 || anty <= 5 || antx >= window.innerWidth - offset - 5 || anty >= window.innerHeight - offset - 5) {
            clearInterval(interval);
            
            startAnt();

        }
    }, moveSpeed);
}

function moveAnt() {
    var col = getColour();

    if (col === 128/*grey*/ || col === 255/*white*/) {
        //change to black
        ctx.fillStyle = "black";
        ctx.fillRect(antx, anty, blkSize, blkSize);
        direction.pivot(1); // 90degrees
    }
    else { /*black*/
        //change to white
        ctx.fillStyle = "white";
        ctx.fillRect(antx, anty, blkSize, blkSize);
        direction.pivot(3); //270degrees
    }

    //Identify which direction to turn to
    switch (direction.getDir()) {

        case 'N':
            antx -= (blkSize);
            break;
        case 'E':
            anty += (blkSize);
            break;
        case 'S':
            antx += (blkSize);
            break;
        case 'W':
            anty -= (blkSize);
            break;
    }
}

function resetCanvas() {

    ctx = document.getElementById('mainCanvas').getContext('2d');

    // Assign width to canvas then into variable
    var ctxWidth = ctx.canvas.width = window.innerWidth - offset;
    var ctxHeight = ctx.canvas.height = window.innerHeight - offset;

    //Set canvas background to grey for viewability 
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, ctxWidth, ctxHeight);
}

function getColour() {
//get the middle pixel of ant.       
    var imgd = ctx.getImageData(antx, anty, 1, 1);
    var pix = imgd.data;
    return pix[0];//red pixel
}


//CLASSES
/***********DIRECTION*****************/
var Direction = function (code) {
    this.code = code;
    this.NESW = ['N', 'E', 'S', 'W'];
};
Direction.prototype.pivot = function (byThisMuch) {
    this.code += byThisMuch;
    this.code %= 4;
};
Direction.prototype.getDir = function () {
    return this.NESW[this.code];
};
/**************************************/

