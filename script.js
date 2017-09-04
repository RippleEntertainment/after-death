//////////////////////////////////////////////////////////////////////////////

var canvas = document.getElementById('death');
var context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//////////////////////////////////////////////////////////////////////////////

var cardDimention = {w: 150, h: 200}
var spacing = 20;
var cardTypes = ['heaven', 'hell', 'reincarnate', 'limbo', 'father', 'son', 'holyspirit']
var cards = [];
var preference;
var popup = new Popup();

generateCards();
setInterval(world,30);

//////////////////////////////////////////////////////////////////////////////

function generateCards() {
	var l = cardDimention.w * cardTypes.length + spacing * (cardTypes.length-1);
	for (var i = canvas.width/2 - l/2, ctr = 0; ctr < cardTypes.length; i+=spacing+cardDimention.w, ctr++) {
		cards.push(new Card(i, canvas.height/2 - cardDimention.h/2))
	}
	cards[0].cardtype = cardTypes[0];
	cards[1].cardtype = cardTypes[1];
	cards[2].cardtype = cardTypes[2];
	cards[3].cardtype = cardTypes[3];
	cards[4].cardtype = cardTypes[4];
	cards[5].cardtype = cardTypes[5];
	cards[6].cardtype = cardTypes[6];
}

//////////////////////////////////////////////////////////////////////////////

function clearCanvas() {
	context.fillStyle = "rgb(224,224,224)";
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
	if (popup.isTransition) {
		popup.update().draw();
	}
}

//////////////////////////////////////////////////////////////////////////////

function shuffleCards() {
	for (var i = 0; i < 50; i++) {
		var crd1 = cards[randomBetween(0, cards.length)];
		var crd2 = cards[randomBetween(0, cards.length)];
		var temp = crd1;
		cards[cards.indexOf(crd1)] = crd2;
		cards[cards.indexOf(crd2)] = temp;
	}
}

//////////////////////////////////////////////////////////////////////////////

function Card(x, y) {
	this.x = x; 
	this.y = y;
	this.cardtype;

	this.activate = function() {
		popup.set(this.cardtype, this.cardtype);
		popup.isTransition = true;
	}

	this.isClick = function(mousex, mousey) {
		if (mousex >= this.x && mousex <= this.x + cardDimention.w) {
			if (mousey >= this.y && mousey <= this.y + cardDimention.h) {
				return true;
			}
		}
		return false;
	}

	this.update = function() {
		return this;
	}

	this.draw = function() {
		context.fillStyle = '#000';
		context.fillRect(this.x, this.y, cardDimention.w, cardDimention.h);
		context.fill();
	}
}

function Popup() {
	this.set = function(t, m) {
		this.title = t;
		this.message = m;
		this.isTransition = false;
	}; this.set('unknown', 'you are a lost soul...');

	this.hide = function() {
		if (this.bgOpacity < 1 || this.txOpacity < 1) return;
		this.bgOpacity = 0;
		this.txOpacity = 0;
		this.isTransition = false;
	}; this.hide();

	this.update = function() {
		if (this.isTransition) {
			if (this.bgOpacity < 1) this.bgOpacity+=0.5;
			if (this.txOpacity < 1) this.txOpacity+=0.08;
		}
		return this;
	}

	this.draw = function() {
		context.fillStyle = 'rgba(224,224,224,'+this.bgOpacity+')';
		context.fillRect(0,0,canvas.width, canvas.height);

		context.fillStyle = 'rgba(0,0,0,'+this.txOpacity+')';
		
		context.font = '50px Arial';
		var text = this.title + ' card';
		var len = context.measureText(text).width;
		context.fillText(text, canvas.width/2 - len / 2, canvas.height/8);

		context.fillRect(canvas.width/2 - cardDimention.w * 1.1, canvas.height / 2 - cardDimention.h * 1.1 - 90
			, cardDimention.w * 2.2, cardDimention.h * 2.2);
	
		context.font = '30px Arial';
		var text = 'this is the ' + this.title + ' card...';
		var len = context.measureText(text).width;
		context.fillText(text, canvas.width/2 - len / 2, canvas.height/8 * 5.5);

		context.font = '12px Arial';
		var text = '( click to continue )';
		var len = context.measureText(text).width;
		context.fillText(text, canvas.width/2 - len / 2, canvas.height/8 * 7.5);
	}

}

//////////////////////////////////////////////////////////////////////////////

window.addEventListener('click', function(e) {
	if (!popup.isTransition) {
		for (var card of cards) {
			if (card.isClick(e.pageX, e.pageY)) {
				card.activate();
				break;
			}
		}
	} else {
		popup.hide();
	}
});