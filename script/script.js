$(document).ready(function(){

  $('#bg_sound')[0].play()
  $('#bg_sound')[0].volume= 0.3;

  $('button').click(function(){

    $('#click_sound')[0].play()
  })

  $('#are').fadeIn(500);

  setTimeout(function(){

    $('#you').fadeIn(500);
  },1000);

  setTimeout(function(){

    $('#ready').fadeIn(500);
  },2000);

  setTimeout(function(){

    $('#startGame').fadeIn(500);
  },3000);

  $('#startGame').click(function(){

    

    $('#landing').fadeOut(500, function(){
       $('#game').fadeIn(500);
       $('#bg_sound')[0].pause();

    });
  })

  // setTimeout(function(){

   
  // },500);

});


const roll_button = document.getElementById("roll_button");
const dice = document.getElementById("dice");
const roll_history = document.getElementById("roll_history");
const game_end_msg = document.querySelector(".game_end_msg");
const restart = document.getElementById("restart");
const refresh = document.getElementById("refresh");
const turn = document.getElementById('turn');
const score=document.querySelector('.score');
const player1_score=document.querySelector('.player1_score');
const player2_score=document.querySelector('.player2_score');
const dice_sound=document.getElementById('dice_sound');

const getDiceFace = (rollResult) => {
  switch (rollResult) {
    case 1:
      return "&#9856";
    case 2:
      return "&#9857";
    case 3:
      return "&#9858";
    case 4:
      return "&#9859";
    case 5:
      return "&#9860";
    case 6:
      return "&#9861";
    default:
      return "";
  }
};

const rollHistoryList = [];

const updateRollHistory = () => {
  roll_history.innerHTML = "";
  for (let i = 0; i < rollHistoryList.length; i++) {
    const listItem = document.createElement("li");
    listItem.classList.add("li");
    listItem.innerHTML = `Roll ${i + 1}: <span> ${getDiceFace(
      rollHistoryList[i]
    )}</span>`;
    roll_history.appendChild(listItem);
    roll_history.classList.add("roll_history");
  }
};

let currentDice=null;

const rollDice = () => {
  const rollResult = Math.floor(Math.random() * 6) + 1;
  currentDice=rollResult;
  console.log(currentDice , typeof currentDice);
  console.log(rollResult);
  const diceFace = getDiceFace(rollResult);
  dice.innerHTML = diceFace;
  console.log(diceFace , typeof diceFace);
  rollHistoryList.push(rollResult);
  updateRollHistory();
  
  
};

let click = 0;
roll_button.disabled = false;

const gameEnd = () => {
  if (click === 6) {
    roll_button.disabled = true;
    game_end_msg.classList.remove("hide");
    dice.classList.add("hide");
    roll_button.classList.add("hide");
    restart.classList.remove("hide");
    refresh.classList.remove("hide");
    click=0;
  
  }
};

let currentPlayer='';

const updateTurn=()=>{

  console.log(currentPlayer);
  currentPlayer=currentPlayer==='player 1'?'player 2':'player 1';
  turn.textContent= 'Turn: ' + currentPlayer;

}


let player1Score=0;
let player2Score=0;

const updateScore = () => {
  if (currentDice === 6 && currentPlayer === "player 1") {
    player1Score++;
    console.log(player1Score);
    player1_score.textContent = "Player1 Score:" + player1Score;
  } else if (currentDice === 6 && currentPlayer === "player 2") {
    player2Score++;

    console.log(player2Score);
    player2_score.textContent = "Player2 Score:" + player2Score;
    
  }
};




roll_button.addEventListener("click", () => {
  //console.log('clicked');
  click++;
 
  

  dice.classList.add("roll-animation");

  setTimeout(() => {
    dice.classList.remove("roll-animation");
  }, 2000);

  dice_sound.currentTime = 0;
  dice_sound.play()
  dice_sound.volume=0.3;

  rollDice();
  updateTurn();
  updateScore();
  gameEnd();
  
});

const gameRestart = () => {
  roll_history.innerHTML = "";
  rollHistoryList.length = 0;
  game_end_msg.classList.add("hide");
  restart.classList.add("hide");
  refresh.classList.add("hide");
  dice.classList.remove("hide");
  roll_button.classList.remove("hide");
  turn.classList.remove('hide')
  roll_button.disabled = false;
  player1_score.textContent="Player1 Score:" + 0;
  player2_score.textContent="Player2 Score:" + 0;
  turn.textContent= 'Turn: ' + '';
};

restart.addEventListener("click", gameRestart);
refresh.addEventListener("click", gameRestart);
