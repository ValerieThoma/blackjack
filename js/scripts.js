$(document).ready(function(){
	
	var playersHand =[];
	var dealersHand = [];
	const freshDeck = createDeck();
	// console.log(freshDeck);
	var theDeck = freshDeck.slice(); //makes a copy of freshDeck, leaves freshDeck "pure"
	

	$('.deal-button').click(()=>{
		playersHand = [];
		dealersHand =[];
		theDeck = freshDeck.slice();
		theDeck = shuffleDeck(theDeck);
		// console.log(theDeck);
		var topCard = theDeck.shift();
		playersHand.push(topCard);
		topCard = theDeck.shift();
		dealersHand.push(topCard);
		topCard = theDeck.shift();
		playersHand.push(topCard);
		topCard = theDeck.shift();
		dealersHand.push(topCard);
		placeCard('player',1,playersHand[0]);
		placeCard('dealer',1,dealersHand[0]);
		placeCard('player',2,playersHand[1]);
		placeCard('dealer',2,dealersHand[1]);
		console.log(playersHand);
		console.log(dealersHand);

		calculateTotal(playersHand,'player');
		calculateTotal(dealersHand,'dealer');
		playersTotal = calculateTotal(playersHand, 'player'); //share these variables with the "deal-button"
		dealersTotal = calculateTotal(dealersHand, 'dealer'); //to identify a black jack hand immediately
		checkBlackJack();
	})
	$('.hit-button').click(()=>{
		console.log("sup");
		var topCard = theDeck.shift();
		playersHand.push(topCard);
		placeCard('player',playersHand.length,playersHand[playersHand.length-1])
		calculateTotal(playersHand,'player');
	})
	$('.stand-button').click(()=>{
		console.log("hey");
		var dealersTotal = calculateTotal(dealersHand, 'dealer');
		while(dealersTotal < 17){
			var topCard = theDeck.shift();
			dealersHand.push(topCard);
			placeCard('dealer', dealersHand.length, topCard);
			dealersTotal = calculateTotal(dealersHand, 'dealer');
		}
		checkWin();
	})

	function checkWin(){
		var playersTotal = calculateTotal(playersHand, 'player');
		var dealersTotal = calculateTotal(dealersHand, 'dealer');
		if(playersTotal > 21){
			$('.message').html("Player BUSTS! HOUSE WINS!");
			$('.new-game').html('<button class="reset">Play Again?</button>');
			$('.new-game').show(".reset");
			$('.reset').click(function(){
				resetDeck();
			})
			console.log("player busted");
			console.log(playersTotal);
		}else if(dealersTotal > 21){
			$('.message').html("Dealer BUSTS! PLAYER WINS!");
			$('.new-game').html('<button class="reset">Play Again?</button>');
			$('.new-game').show(".reset");
			$('.reset').click(function(){
				resetDeck();
			})	
			}else{
				if(playersTotal > dealersTotal){
					$('.message').html("PLAYER WINS!");
				}else if(dealersTotal > playersTotal){
					$('.message').html("DEALER WINS!");
				}else{
					$('.message').html("PUSH! Have another drink and play again.");
				}
			}
		$('.new-game').html('<button class="reset">Play Again?</button>');
		$('.new-game').show(".reset");
		$('.reset').click(function(){
			resetDeck();
		})	
	}

	function checkBlackJack(){ //Creating a function to check (upon initial deal) "if" BlackJack. Will call during deal-button listener//
		if(playersHand.length == 2 && playersTotal == 21){
			$('.message').html("BLACKJACK - PLAYER WINS!");
				$('.new-game').html('<button class="reset">Play Again?</button>');
				$('.new-game').show(".reset");
				$('.reset').click(function(){
					resetDeck();
			})
		}else if(dealersHand.length == 2 && dealersTotal == 21){
			$('.message').html("BLACKJACK- DEALER WINS");
				$('.new-game').html('<button class="reset">Play Again?</button>');
				$('.new-game').show(".reset");
				$('.reset').click(function(){
					resetDeck();
			})
			}


	}

	function calculateTotal(hand, who){
		var handTotal = 0;
		var thisCardsValue = 0;
		for(let i = 0; i < hand.length; i ++){
			thisCardsValue = Number(hand[i].slice(0,-1));
			handTotal += thisCardsValue;
		}
		var classSelector = `.${who}-total`;
		$(classSelector).html(handTotal);
		return handTotal;
	}

	function placeCard(who,where,whatToPlace){
		var classSelector = `.${who}-cards .card-${where}`
		$(classSelector).html(`<img src="images/cards/${whatToPlace}.png" />`);


	}

	function createDeck(){
		var newDeck = [];
		const suits = ['h', 's', 'd','c'];
		for(let s = 0; s < suits.length; s++){
			for(let c = 1; c <= 13; c ++){
				newDeck.push(c+suits[s]);
			}
		}
		return newDeck;	
	}
	function shuffleDeck(aDeckToBeShuffled){
		for(let i = 0; i < 50000; i++){
			var rand1 = Math.floor(Math.random() * aDeckToBeShuffled.length);
			var rand2 = Math.floor(Math.random() * aDeckToBeShuffled.length);
			let card1temp = theDeck[rand1];
			aDeckToBeShuffled[rand1] = aDeckToBeShuffled[rand2];
			aDeckToBeShuffled[rand2] = card1temp;
		}
		// console.log(theDeck);
		return aDeckToBeShuffled;
	}	
	function resetDeck(){ //Creating a function to clear the table, reshuffle the deck, reset message class,//
		//and clear scores. Will call at checkWin and checkBlackJack//
		playersHand =[];
		dealersHand = [];
		theDeck = [];
		$('.card').html("");
		$('.message').html("");
		calculateTotal(playersHand,'player');
		calculateTotal(dealersHand,'dealer');
		theDeck = shuffleDeck(theDeck);
		$('.new-game').hide(".reset");
	}





}); //end DOM ready//