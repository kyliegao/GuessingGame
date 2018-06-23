function generateWinningNumber(){
	var randomNum = Math.random()*100

	if (Math.ceil(randomNum) === 0){
		return 1
	} else if(Math.ceil(randomNum) === 63){
		return 64
	} else {
		return Math.ceil(randomNum)
	}

}


function shuffle (array){
	var m = array.length,t,i;

	while (m){
		i = Math.floor(Math.random()*m--);

		t = array[m];
		array[m] = array[i];
		array[i] = t;
	}

	return array
}


function Game (){
	this.playersGuess = null,
	this.pastGuesses = [],
	this.winningNumber = generateWinningNumber(),
	this.difference = function() {
		return Math.abs(this.playersGuess - this.winningNumber)
	}
	this.isLower = function(){
		if (this.playersGuess < this.winningNumber){
			return true
		} else{
			return false
		}
	}
	this.playersGuessSubmission = function (num){
		if (num <1 || num > 100 || isNaN(num)){
			throw 'That is an invalid guess.'
		}

		this.playersGuess = num
		return this.checkGuess(num)
	}

	this.provideHint = function(){
		var hintArr = [this.winningNumber, generateWinningNumber(),generateWinningNumber()]
		return shuffle (hintArr)
	}


}


Game.prototype.checkGuess = function(num){
	// check for errors, or if you've guessed before

	if (num === this.winningNumber){
		$('#hint, #submit').prop('disabled',true);
		$('#subtitle').text('You Win! Press the reset button to play again!')
		return 'You Win!'
	} if (this.pastGuesses.indexOf(num)>-1){
		$('#title').text('You have already guessed that number.')
		return 'You have already guessed that number.'
	} else {
		this.pastGuesses.push(num)
		$('#guess-list li:nth-child('+ this.pastGuesses.length +')').text(num);
	}


	// check if you've reached the maximum number of guesses
	if (this.pastGuesses.length === 5){
		// console.log(this.pastGuesses)
		$('#hint, #submit').prop('disabled',true);
		$('#title').text('You Lose.')
		$('#subtitle').text("Press the Reset button to play again!")
		return 'You Lose.';
	}


	// lets you know if you're close
	diff = Math.abs(this.winningNumber - num)
	// console.log(this.diff)

	if (diff < 10){
		$('#title').text('You\'re burning up!')
		return 'You\'re burning up!'
	} if (diff < 25){
		$('#title').text("You\'re lukewarm.")
		return "You\'re lukewarm."
	} if (diff < 50){
		$('#title').text("You\'re a bit chilly.")
		return "You\'re a bit chilly."
	} else {
		$('#title').text("You\'re ice cold!")
		return "You\'re ice cold!"
	}

}


function newGame (){
	return new Game
}


$(document).ready(function(){
		$('#submit').click(
			console.log('Submit button has been clicked')
		)
	}
)


function makeAGuess(game){
	var guess = $('#player-input').val();
	$('#player-input').val('');
	var output = game.playersGuessSubmission(parseInt(guess,10));
	console.log(output)
}




$(document).ready(function(){
	var game = new Game();
	console.log(game.winningNumber)

	$('#submit').click(function(e){
		makeAGuess(game);
	})

	$('#player-input').keypress(function(event){
		if(event.which == 13){
			makeAGuess(game)
		}
	})

	$('#hint').click(function(){
		var hints = game.provideHint();
		$('#title').text('The winning number is '+hints[0]+', '+hints[1]+' or '+hints[2])
		console.log('hint is working')
		$('#hint').prop('disabled',true)
	});


	$('#reset').click(function(){
		game = newGame();
		$('#title').text('Play the Guessing Game!');
		$('#subtitle').text('Guess a number between 1 - 100!');
		$('.guess').text('-');
		$('#hint, #submit').prop('disabled',false);
	})

	// $('#reset').click(function(){

	// 1. create new game
	// 2. store #player-input into game
	// 3. clear the input element
	// 4. pass the submitted value into playersGuessSubmisison and store the output -> extracted value will always be a string


})
