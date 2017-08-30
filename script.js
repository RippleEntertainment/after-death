//////////////////////////////////////////////////////////////////////////////

var canvas = document.getElementById('death');
var context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//////////////////////////////////////////////////////////////////////////////

var cardDimention = {w: 200, h: 250}
var spacing = 50;
var cardTypes = ['heaven', 'hell', 'reincarnate', 'limbo', 'father', 'son', 'holyspirit']
var cards = [];
var preference;

generateCards();
setInterval(world,30);

//////////////////////////////////////////////////////////////////////////////

function generateCards() {
	var l = cardDimention.w * cardTypes.length + spacing * (cardTypes.length-1);
	for (var i = canvas.width/2 - l/2, ctr = 0; ctr < cardTypes.length; i+=spacing+cardDimention.w, ctr++) {
		cards.push(new Card(i, canvas.height/2 - cardDimention.h/2))
	}
	// cards[0].cardtype = cardTypes[0];
	// cards[1].cardtype = cardTypes[1];
	// cards[2].cardtype = cardTypes[2];
	// cards[3].cardtype = cardTypes[3];
	// cards[4].cardtype = cardTypes[4];
	// cards[5].cardtype = cardTypes[5];
}

//////////////////////////////////////////////////////////////////////////////

function clearCanvas() {
	context.fillStyle = "#fff";
	context.fillRect(0,0,canvas.width,canvas.height);
}

function randomBetween(min,max) {
	return Math.floor((Math.random()*(max - min)+min));
}

//////////////////////////////////////////////////////////////////////////////

function world() {
	clearCanvas();
	for (var card of cards) {
		card.update().draw();
	}
}
console.log(cards);

//////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////

function Card(x, y) {
	this.x = x; 
	this.y = y;
	this.cardtype;

	this.update = function() {
		return this;
	}

	this.draw = function() {
		context.fillStyle = '#000';
		context.fillRect(this.x, this.y, cardDimention.w, cardDimention.h);
		context.fill();
	}
}

//////////////////////////////////////////////////////////////////////////////