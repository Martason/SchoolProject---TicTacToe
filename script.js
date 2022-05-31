
import { Game as TicTacToe } from "./game.js";
import {delay} from "./util.js";



let game;
game = new TicTacToe();

//const gameInfoElem = document.getElementById('gameStatus');
const gameStatusElem = document.querySelector(".currentPlayer");
const playerScoreElem = document.querySelector(".pointsPlayer");
const computerScoreElem = document.querySelector(".pointsComputer");

document.querySelectorAll(".square").forEach(square => square.addEventListener('click', handlePlayerClick));
document.getElementById("play-btn").addEventListener('click', newGame); 
document.getElementById("resetScore-btn").addEventListener('click', resetScoreBoard)


/** 
 * Updates gameTurn element with whos turn it is
 */
function updateTurnText(){
    let turnText = game.currentPlayer === game.playerMark? "Players turn" : "Computers turn";
    gameStatusElem.innerText = `${turnText}`;
}
/** 
 * Updates gameScore element with current score
 */
function updateScoreText(){
    playerScoreElem.innerText = game.playerScore;
    computerScoreElem.innerText = game.computerScore;
}

/** 
 * Reset Scoreboard to score 0
 */
 function resetScoreBoard(){
    game.resetScore();
    playerScoreElem.innerHTML = '0';
    computerScoreElem.innerHTML = '0';
}


updateTurnText();
updateScoreText();
handelComputersMove();

/**
 Handels user click, validates playerMark placement and checks for win. 
 Updates squaresStatus array and board.
 Calls computerMove
 * @param e - The div the user klicked on.
 */
function handlePlayerClick(e){
    if(game.currentPlayer === game.computerMark) return;
        
    else{
        const clickedSquareId = e.target.id;

        if(game.updateSquaresStatus(clickedSquareId) && game.gameActive) {

            e.target.innerText = game.currentPlayer;

            if(game.gameWonCheck()){
            let winnerText = game.currentPlayer === game.playerMark? "Player" : "Computer";
                gameStatusElem.innerText = `${winnerText} har won!`
                updateScoreText();
            }

            else if(game.fullBoard()){
                gameStatusElem.innerText = `Its a draw!`
            }
            
            else{ game.changePlayer();
                updateTurnText();
                handelComputersMove()
            }
        }
    }
}

/** 
 * Calls computermove and checks for win
 * Updates board and changes back to player
 */
async function handelComputersMove(){
    if(game.currentPlayer === game.playerMark) return;

    const computerSquareId = document.getElementById(game.computerMove());

    await delay(800);

    computerSquareId.innerText = game.currentPlayer;
 
    if(game.gameWonCheck()){
        let winnerText = game.currentPlayer === game.playerMark? "player" : "Computer";
        gameStatusElem.innerText = `${winnerText} has won!`
        updateScoreText();
    }
    else if(game.fullBoard()){
        gameStatusElem.innerText = `Its a draw!`
    }

    else{
        game.changePlayer();
        updateTurnText();
    }
}

/** 
 * Updates board for a new game
 */
function newGame(){
    game = new TicTacToe();
    
    document.querySelectorAll(".square").forEach(square => {square.innerText = ""});
    updateTurnText();

    handelComputersMove()
}


 