/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;
reset();

// scores = [0, 0];
// roundScore = 0;
// activePlayer = 0;

// dice = Math.floor(Math.random() * 6) + 1;

// document.querySelector("#current-" + activePlayer).textContent = dice;
//textContent method that we have here can only send plain text. To send HTML we have innerHTML method. HTML codes is send in Quotes.
 
// document.querySelector("#current-" + activePlayer).innerHTML =   "<em>" + dice + "</em>";

// var x = document.querySelector("#score-0").textContent;
// console.log(x);
// document.querySelector(".dice").style.display = "none";

/***
 * There is another method of getting elements by ID. THis method is little faster
 */

// document.getElementById("score-0").textContent = "0";
// document.getElementById("score-1").textContent = "0";
// document.getElementById("current-0").textContent = "0";
// document.getElementById("current-1").textContent = "0";

/******
 * Event and Event Handling
 * Events: Notification that are send to notify the code that something happened on the webpage; Example: clicking a button, resizing a window, scrolling down or pressing a key.
 * Event listener: A function that perform an action based on certain event. it waits for a specific event to happen. It is just a function that sits there and waits for the specific event to happen.
 * An event can only be processed or handled as soon as execution stack is empty. Which means all the functions have returned.
 * Besides the execution stack we also have Message Queue in JavaScript Engine, this is where all the event that happen in the browser are put and they sit there waiting to be processed. Which will happen once the execution stack is empty.
 * As soon as the execution stack is empty so event listener is called and since it is a function it gets its own execution context, which is then put on the top of the stack and become the active execution context.
 */
//Setting Up event Handler

// function btn() {
//   //Do something here
// }
// btn();

// document.querySelector(".btn-roll").addEventListener("click", btn);
/**
 * here we don't want to call the function ourself, rather we want the event listener to call the function for us. So this
 * 'btn' function is then call callBack function, as it is called by another function.
 *
 * Now instead of calling an external function, we can add function in the event listener, that would be called an Anonymous function. As this function has no name. We cannot use this function outside of this context here, so we cannot call this function at other place.
 */
/************************************************************************************************
 * Program starts from here
 *
 *
 *
 *
 *
 *
 *
 *
 */
document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    //1. Generate a random number between 1 and 6
    var dice = Math.floor(Math.random() * 6) + 1;
    console.log(dice);

    //2. Display  the result
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block"; // why this is not displayed first and then the diceDOM.src
    //   document.querySelector(".dice").style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";

    //3. Update the round score (at UI) if the rolled number is not 1
    if (dice !== 1) {
      //add the score
      roundScore += dice;
      document.querySelector("#current-" + activePlayer).textContent = roundScore;
    } else {
      //Next player.
      nextPlayer();

      // document.querySelector(".player-0-panel").classList.remove("active");
      // document.querySelector(".player-1-panel").classList.add("active");
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    //Add current score to global score

    scores[activePlayer] += roundScore;

    //Udate the UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    //check if player won the game
    if (scores[activePlayer] >= 100) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner";
      document.querySelector(".dice").style.display = "none";
      /****
       * here note if we have lot of style to change it is not best practice to do it this way.
       * It is better to add new CSS class to the element contatining all the styles that we want to apply
       */
      document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
      document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  // document.querySelector(".dice").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", reset);

function reset() {
  gamePlaying = true;
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;

  document.querySelector(".dice").style.display = "none";
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}
