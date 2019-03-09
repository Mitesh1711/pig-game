/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// global variables
var score, roundScore, activePlayer, gamePlaying;

// Initial variable values
init();

//roll dice button behaviour
document.querySelector('.btn-roll').addEventListener('click', function() {
  if(gamePlaying){
    //Random number generator
    var dice = Math.floor(Math.random() * 6) + 1;

    // assigning image to the dice
    var diceBox = document.querySelector('.dice');
    diceBox.style.display = 'block';
    diceBox.src = 'dice-' + dice + '.png';

    //set the round score for PLAYERS
    if (dice !== 1) {
      roundScore += dice;
      document.getElementById('current-' + activePlayer).textContent = roundScore;
    } else {
      nextPlayer();
    }
  }
});

//hold button behaviour
document.querySelector('.btn-hold').addEventListener('click', function(){

if(gamePlaying){
  score[activePlayer] += roundScore;
  document.getElementById('score-'+activePlayer).textContent = score[activePlayer];

  if(score[activePlayer] >= 50){
    document.querySelector('#name-'+activePlayer).textContent = 'Winner';
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
    document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
    gamePlaying = false;
    }
  else{
  nextPlayer();
}
}
});

//new game button behaviour
document.querySelector('.btn-new').addEventListener('click', init);

// Game initialisation
function init(){
  score = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  //to hide dice at the start of game
  document.querySelector('.dice').style.display = 'none';

  // set all score to 0 initially
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';

  document.querySelector('#name-0').textContent = 'Player 1';
  document.querySelector('#name-1').textContent = 'Player 2';

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');

  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');

  document.querySelector('.player-0-panel').classList.add('active');
}

// to toggle between players
function nextPlayer(){
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0 ;
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
}
