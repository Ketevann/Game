function generateWinningNumber() {
	return Math.floor(Math.random() * 100) + 1 
}

function shuffle(array) {
	var m = array.length, t, i;
    while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

function Game(){
	this.playersGuess = null;
	this.pastGuesses =[];
	this.winningNumber = generateWinningNumber();
}

Game.prototype.difference = function() {
	return Math.abs(this.playersGuess - this.winningNumber)
};

Game.prototype.isLower = function(){
	return this.playersGuess < this.winningNumber;
}

Game.prototype.playersGuessSubmission = function(num){
	if (isNaN(num) === true || (num < 1 || num > 100)){
		$('#title').text("That is an invalid guess.");
		$('#subtitle').text("Guess Again.");
		throw "invalid guess"
	}
	this.playersGuess = num;
	return this.checkGuess();


}

Game.prototype.checkGuess = function(){
 	var buttons = $("#submit, #hint, #players-input")
	 if (this.playersGuess === this.winningNumber){
	 	$(buttons).prop('disabled', true).css('opacity',1);
	 	$(buttons).css("cursor", "default");
	 	$('#subtitle').text("Please click the reset button to play again!")
		return "You Win!";
	}
	else{ 
	
	 	if (this.pastGuesses.indexOf(this.playersGuess)> -1){
	 		$('#title').text("Guess Again!")
			return "You have already guessed that number.";
		}
		else {
			
			
			
			this.pastGuesses.push(this.playersGuess)
			$('#guess-list li:nth-child('+ this.pastGuesses.length +')').text(this.playersGuess);
	 		if(this.pastGuesses.length === 5){
	 			$(buttons).prop('disabled', true).css('opacity',1);
	 			$(buttons).css("cursor", "default");
	 			$('#subtitle').text("Please, click the reset button to play again!")
	 			return "You Lose.";
	 		}
	
	 
 			else{
      			var diff = this.difference();
      			if(this.isLower()) {
                    $('#subtitle').text("Guess Higher!")
                } else {
                    $('#subtitle').text("Guess Lower!")
                }
				if (diff < 10) {
					
					return "You\'re burning up!";
				}
				else if (diff < 25)	{
					
					return "You\'re lukewarm.";
				}
				else if (diff < 50)	{
					
					return "You\'re a bit chilly.";
				}
				else {
					
					return "You\'re ice cold!";
				}
			}
		}
	}
}

function newGame (){
	return new Game();
	
}
Game.prototype.provideHint =function(){
	var arr =[this.winningNumber,generateWinningNumber(), generateWinningNumber()];
	return shuffle(arr)
	
}

function valueEntered(game){
	var guess = +$('#players-input').val()
	if (!($('#players-input').val())){
		if ($('#headers').find('.prepended').length)
			$('.prepended').empty();
			$('h3').append('<div class="prepended">Please enter a number </div>');
	}
	else{
		$('#players-input').val("");
		var result = game.playersGuessSubmission(guess);
		$('#title').text(result)
	}
}
$(document).ready(function(){
 	var game = new Game();
    $('#submit').click(function(e){
 	valueEntered(game);
 	
 });
	$("#players-input").keypress(function(e){
  		if(e.which == 13) {
        	valueEntered(game);
    	}
 	
 	});

	$('#hint').click(function(){
		var hintArr = game.provideHint();
		$("#title").text("Thi winning number is " + hintArr[0] + ", " + hintArr[1]+ ", or " +hintArr[2]);;
	});

	$('#reset').click(function(){
		game = new Game();
		$("#submit, #hint, #players-input").prop('disabled', false);
		$("#title").text("Play the Guessing Game!")
		$("#subtitle").text("Guess a number between 1-100!");
		$(".guess").text("-")


	});

});



