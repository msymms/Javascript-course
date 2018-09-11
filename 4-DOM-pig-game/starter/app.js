/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer;
var doc = document;
scores = [0, 0];
roundScore = 0;
activePlayer = 0;
var diceDOM = doc.querySelector('.dice');
diceDOM.style.display = 'none';

doc.getElementById('score-0').textContent = 0;
doc.getElementById('score-1').textContent = 0;
doc.getElementById('current-0').textContent = 0;
doc.getElementById('current-1').textContent = 0;



function btn() {
    //do something here
}

doc.querySelector('.btn-roll').addEventListener('click', function () {
    //anonymous function to handle the roll

    // need a rnadom number
    var dice = Math.floor(Math.random() * 6) + 1;

    // Display the result
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    //  Update the round score If the number rolled is higher than 1
    if (dice !== 1) {
        //add score
        roundScore += dice;
        doc.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        nextPlayer();

    }
});

doc.querySelector('.btn-hold').addEventListener('click', function () {

    //update global score
    scores[activePlayer] += roundScore;

    //update UI
    doc.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

    //Check to see if the player won the game
    if (scores[activePlayer] >= 100) {
        doc.getElementById('name-' + activePlayer).textContent = 'Winner!';
        diceDOM.style.display = 'none';
        doc.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        doc.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    } else {
        
        //nextPlayer
        nextPlayer();
    }
});

function nextPlayer() {
    roundScore = 0;
    doc.getElementById('current-' + activePlayer).textContent = 0;
    //remove the dot
    doc.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    //add the dot to the new player
    doc.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
};