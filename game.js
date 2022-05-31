import {} from "./util.js";
/**
 * @class
 * @classdesc gamelogic for tactactoe whit properties and methods 
 */
export class Game{
    
    /**
     * Stores the current game status. Tracks played squares and enabales wins- and drawvalidation
    */
    squaresStatus = ["", "", "", "", "", "", "", "", ""]
    /**
     * Stores the current game status. Uses for restar of the game and validates player click 
    */
    gameActive = true;
    /**
     * Stores the playerMark as "O".
    */
    playerMark = "O";
     /**
     * Stores the computerMark as "X".
    */
    computerMark = "X";
    /**
     * Holds the currentPlayer, ether player or computer.
    */
    currentPlayer;
    /**
     * Stores playerScore.
    */
   playerScore;
   
    /**
     * Stores computerScore.
    */
   computerScore;
     
    /**
     * randomly sets currentPlayer as eather computer or player and tores and set score from localStorage.
     * @constructor
    */
    constructor(){
        let start = Math.random() >= 0.5; 
        if(start){
            this.currentPlayer = this.playerMark;
        }
        else{
           this.currentPlayer = this.computerMark;
        }

        this.playerScore = localStorage.getItem('savedPlayerScore') ?? 0;
        if(this.playerScore === 0) localStorage.setItem('savedPlayerScore', "0");

        this.computerScore = localStorage.getItem('savedComputerScore') ?? 0;
        if(this.computerScore === 0) localStorage.setItem('savedComputerScore', "0");
    }


/** 
 * @description Checks if game is won or not. If won: sets gameactive as false, stores scores and returns true.
 * @returns boolean
 */
gameWonCheck() {

    let gameWon = false;
    
    if(this.squaresStatus[0] === this.currentPlayer)
    {
        if(this.squaresStatus[1] === this.currentPlayer && this.squaresStatus[2] === this.currentPlayer){
            console.log(`${this.currentPlayer} wins on the top!`);
            this.gameActive = false;
            this.saveWinnerScore(this.currentPlayer)
            return gameWon = true;
        }

        if(this.squaresStatus[3] === this.currentPlayer && this.squaresStatus[6] === this.currentPlayer){
            console.log(`${this.currentPlayer} wins on the on the left!`);
            this.gameActive = false;
            this.saveWinnerScore(this.currentPlayer)
            return gameWon = true;
        }

        if(this.squaresStatus[4] === this.currentPlayer && this.squaresStatus[8] === this.currentPlayer){
            console.log(`${this.currentPlayer} wins on diagonally!`);
            this.gameActive = false;
            this.saveWinnerScore(this.currentPlayer)
            return gameWon = true;
        }
    }
    if(this.squaresStatus[1] === this.currentPlayer)
    {
        if(this.squaresStatus[4] === this.currentPlayer && this.squaresStatus[7] === this.currentPlayer){
            console.log(`${this.currentPlayer} wins in the middle!`);
            this.gameActive = false;
            this.saveWinnerScore(this.currentPlayer)
            return gameWon = true;
        }
    }

    if(this.squaresStatus[2] === this.currentPlayer)
    {
        if(this.squaresStatus[5] === this.currentPlayer && this.squaresStatus[8] === this.currentPlayer){
            console.log(`${this.currentPlayer} wins on the right!`);
            this.gameActive = false;
            this.saveWinnerScore(this.currentPlayer)
            return gameWon = true;
        }

        if(this.squaresStatus[4] === this.currentPlayer && this.squaresStatus[6] === this.currentPlayer){
            console.log(`${this.currentPlayer} wins diagnonally!`);
            this.gameActive = false;
            this.saveWinnerScore(this.currentPlayer)
            return gameWon = true;
        }
    }
    
    if(this.squaresStatus[3] === this.currentPlayer)
    {
        if(this.squaresStatus[4] === this.currentPlayer && this.squaresStatus[5] === this.currentPlayer){
            console.log(`${this.currentPlayer} wins in the middle!`);
            this.gameActive = false;
            this.saveWinnerScore(this.currentPlayer)
            return gameWon = true;
        }
    }

    if(this.squaresStatus[6] === this.currentPlayer)
    {
        if(this.squaresStatus[7] === this.currentPlayer && this.squaresStatus[8] === this.currentPlayer){
            console.log(`${this.currentPlayer} wins on the bottom!`);
            this.gameActive = false;
            this.saveWinnerScore(this.currentPlayer)
            return gameWon = true;
        }
    }

    return gameWon;
        
};

/**
 * @description Checks is SquareStatus array is full or not
 * @returns boolean
 */
fullBoard() {
    
    let fullBoard = !this.squaresStatus.includes("");
    if (fullBoard){
        this.gameActive = false;
        return true;
    }

    return false;
};
 
/**
 * @description checks and updates the SquareStatus array. Index must be empty and gameactive
 * @param SquareId - Id of the square the mark is placed on
 * @returns boolean
 */
updateSquaresStatus (SquareId) {

    let updateOK = false

    if(this.squaresStatus[SquareId] === "" && this.gameActive) 
    {
        this.squaresStatus[SquareId] = this.currentPlayer;
        updateOK = true;
    }

return updateOK;
}
 /**
 * Changes currentPlayer
 */
changePlayer () {
    this.currentPlayer = this.currentPlayer === this.playerMark? this.computerMark : this.playerMark
}

/**
 * Saves winnerscore to localStorage
 * @param winner - currentPlayer mark
 */ 
saveWinnerScore (winner){
//TODO testat olika varianter för att hämta data från localstorage. +localStaorage, parseInt samt parseJSON. ´+ och parseInt kräver att localstorage inte är null. JSON.Parse krävde inte det utan kunde addera 1 till null. vad är bättre?

    if(winner === this.playerMark) {

        let newScore = +localStorage.getItem('savedPlayerScore') +1;
        localStorage.setItem('savedPlayerScore', JSON.stringify(newScore));
        this.playerScore = newScore;        
    }
    else
    {
        let newScore = localStorage.getNumber('savedComputerScore') + 1;        
        localStorage.setItem('savedComputerScore', JSON.stringify(newScore) );
        this.computerScore = newScore;
    }
}
/**
 * resets scores stored in localStorage
 */
resetScore() {

    localStorage.removeItem('savedPlayerScore');
    localStorage.removeItem('savedComputerScore')
}

/**
 * @returns an array with all empty squares
 */
getEmptySquares() {
     var indexes = [];
        for(var i = 0; i < this.squaresStatus.length; i++) {
            if(this.squaresStatus[i] === "") {
                indexes.push(i);
            }
        }
        return indexes;
    }

 /**
 * Blind random move made by the computer. Updates a empty squaresStatus[] whit computerMark
 * @returns the index of the square the computer played
 */
computerMove() {
    //TODO hade varit kul att ha datorn lite smartare och i alla fall kunna blockera om usern kan vinna på nästa move. 

    let avalableSquares = this.getEmptySquares();
    let computerSquarePlacement = avalableSquares[Math.floor(Math.random() * avalableSquares.length)];
    
    this.updateSquaresStatus(computerSquarePlacement);

    return computerSquarePlacement;
}

}


