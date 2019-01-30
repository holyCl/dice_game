/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var prevdice, dice, scores, roundScore, activePlayer, gamePlay;



//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

gameStart();

document.querySelector('.btn-roll').addEventListener('click', function() {
	if (gamePlay){
		if (roundScore != 0)
			prevdice = dice;
		dice = Math.floor(Math.random()*6+1);
		document.querySelector('#current-' + activePlayer).textContent = dice;
		document.getElementById('dice').style.display = 'block';
		document.getElementById('dice').src = 'dice-' + dice + '.png';	
		console.log(prevdice, dice);
		if (prevdice == 6 && dice == 6){
			scores[activePlayer] = 0;
			document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
			nextPlayer();
		}
		if (dice === 1)
			nextPlayer();
		else
			roundScore += dice;
	}
});

document.querySelector('.btn-hold').addEventListener('click', function() {
	if (gamePlay){
	scores[activePlayer] += roundScore;
	document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
	winScore = document.querySelector('.final-score').value;
	if (winScore)
		var score = winScore;
	else
		var score = 100;
	if (scores[activePlayer] >= score){
		document.querySelector('#name-'+ activePlayer).textContent = 'Winner!';
		document.getElementById('dice').style.display = 'none';
		document.querySelector('.player-0-panel').classList.remove('active');
		document.querySelector('.player-1-panel').classList.remove('active');
		document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
		gamePlay = false;
	}
	else
		nextPlayer();
	}
});

document.querySelector('.btn-new').addEventListener('click', function() {
	gameStart();
});

function gameStart()
{
	gamePlay = true;
	roundScore = 0;
	activePlayer = 0;
	scores = [0,0];
	document.getElementById('score-0').textContent = 0;
	document.getElementById('score-1').textContent = 0;
	document.getElementById('current-0').textContent = 0;
	document.getElementById('current-1').textContent = 0;
	document.getElementById('dice').style.display = 'none';
	document.querySelector('#name-0').textContent = prompt('write down name of player1');
	document.querySelector('#name-1').textContent = prompt('write down name of player2');
	document.querySelector('.player-0-panel').classList.add('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');

}

function nextPlayer(){

	document.getElementById('current-' + activePlayer).textContent = 0;
	activePlayer = activePlayer === 1? 0:1;
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
	roundScore = 0;
	prevdice = undefined;
//	document.querySelector('.dice').style.display = 'none';
}
