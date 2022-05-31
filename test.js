

import { Game as TicTacToe } from "./game.js";


const assert = chai.assert;
const expect = chai.expect;


describe("Testar gameWon", function () {

    let game;
    this.beforeEach(function() {
        game = new TicTacToe();
    });     
  
    it("returns false when empty board", function () {
        assert.isFalse(game.gameWonCheck()) 
    });

    it("returns false when there is no winning combination ", function () {
        game.squaresStatus[0] = game.currentPlayer;
        game.squaresStatus[4] = game.currentPlayer;
        game.squaresStatus[2] = game.currentPlayer;

        assert.isFalse(game.gameWonCheck()) 
    });

    it("returns true when wins on the top!", function () {
        game.squaresStatus[0] = game.currentPlayer;
        game.squaresStatus[1] = game.currentPlayer;
        game.squaresStatus[2] = game.currentPlayer;

        assert.isTrue(game.gameWonCheck()) 
    });

    it("returns true when wins on the bottom!", function () {
        game.squaresStatus[6] = game.currentPlayer;
        game.squaresStatus[7] = game.currentPlayer;
        game.squaresStatus[8] = game.currentPlayer;
        
        assert.isTrue(game.gameWonCheck()) 
    });

    it("returns true when wins in the middle!", function () {
        game.squaresStatus[3] = game.currentPlayer;
        game.squaresStatus[4] = game.currentPlayer;
        game.squaresStatus[5] = game.currentPlayer;
        
        assert.isTrue(game.gameWonCheck()) 
    });
    it("returns true when wins diagonaly!", function () {
        game.squaresStatus[2] = game.currentPlayer;
        game.squaresStatus[4] = game.currentPlayer;
        game.squaresStatus[6] = game.currentPlayer;
        
        assert.isTrue(game.gameWonCheck()) 
    });

    it("returns true when wins diagonaly!", function () {
        game.squaresStatus[0] = game.currentPlayer;
        game.squaresStatus[4] = game.currentPlayer;
        game.squaresStatus[8] = game.currentPlayer;
        
        assert.isTrue(game.gameWonCheck()) 
    });
  
});

describe("Testar fullBoard", function (){
    let game;
    this.beforeEach(function() {
        game = new TicTacToe();
    }); 

    it("returns false when empty board", function () {
        assert.isFalse(game.fullBoard()) 
        });

    it("returns true when board is full", function () {
        game.squaresStatus = game.squaresStatus.map (_ => "O");
        assert.isTrue(game.fullBoard())
    });

});


describe("Testar updateSquaresStatus", function (){
    let game;
    this.beforeEach(function() {
        game = new TicTacToe();
    }); 

    it("Returns false if marker is placed on occupied square", function (){
        game.squaresStatus[0] = game.playerMark;
        assert.equal(game.playerMark, game.squaresStatus[0]);
        assert.isFalse(game.updateSquaresStatus(0));
    })

    it("Returns true if marker is placed is placed on that empty square", function (){
        assert.equal("", game.squaresStatus[1]);
        assert.isTrue(game.updateSquaresStatus(1));
    });
})

describe("Testar changePlayer", function(){
    let game;
    this.beforeEach(function() {
        game = new TicTacToe();
    }); 

    it("changePlayer(currentPlayer) changes currentPlayer from playerMark to computerMark", function(){
        game.currentPlayer = game.playerMark;
        assert.equal(game.playerMark, game.currentPlayer);
        assert.equal("O", game.currentPlayer);

        game.changePlayer(game.currentPlayer);
        assert.equal(game.computerMark, game.currentPlayer)
        assert.equal("X", game.currentPlayer);
    })

    it("changePlayer(currentPlayer) changes currentPlayer from computerMark to playerMark", function(){
        game.currentPlayer = game.computerMark;
        assert.equal(game.computerMark, game.currentPlayer);
        assert.equal("X", game.currentPlayer);

        game.changePlayer(game.currentPlayer);
        assert.equal(game.playerMark, game.currentPlayer)
        assert.equal("O", game.currentPlayer);
    });
});

  describe("Testar saveWinner", function (){
    let game;
    this.beforeEach(function() {
        game = new TicTacToe();
    }); 

    it("localstorage key 'savedPlayerScore' is '1' after savewinner(playerMark) is called", function(){

        localStorage.clear();
        assert.isNull(localStorage.getItem('savedPlayerScore'));

        game.saveWinnerScore(game.playerMark)
        assert.equal(1,localStorage.getItem('savedPlayerScore'));
    });
//TODO Fråga björn här. localstorage töms ju inte här men det vill jag inte?
    it("localstorage key saved ComputerScore = '1' after savewinner(computerMark) is called", function(){
        game.saveWinnerScore(game.computerMark)
        assert.equal(1,localStorage.getItem('savedComputerScore'));
    });

});

describe ("Testar resetSocore", function () {
    let game;
    this.beforeEach(function() {
        game = new TicTacToe();
    }); 

    it("resetScore clears the local storage", function(){
        assert.equal(1, localStorage.getItem('savedPlayerScore'));
        assert.equal(1,localStorage.getItem('savedComputerScore'));

        game.resetScore();

        assert.equal(null, localStorage.getItem('savedPlayerScore'));
        assert.equal(null,localStorage.getItem('savedComputerScore'));
    });

})


describe ("Testar getEmptySquares", function () {
    let game;
    this.beforeEach(function() {
        game = new TicTacToe();
    }); 
        
  
    it("getEmptySquares().lenght = 6 when there is six empty values in squaresStatus" , function(){ 
        
        game.squaresStatus[2] = game.computerMark;
        game.squaresStatus[3] = game.computerMark;
        game.squaresStatus[4] = game.computerMark;
        
        expect(game.squaresStatus[2,3,4]).to.equal(game.computerMark);
        assert.equal(9,game.squaresStatus.length)
        assert.equal(6, game.getEmptySquares().length);
    });

    it("getEmptySquares() retuns an array with value 0,1,5,6,7,8" , function(){
        game.squaresStatus[2] = game.computerMark;
        game.squaresStatus[3] = game.computerMark;
        game.squaresStatus[4] = game.computerMark;
        
        expect(game.squaresStatus[2,3,4]).to.equal(game.computerMark);
        assert.equal(0, game.getEmptySquares()[0]);
        assert.equal(1, game.getEmptySquares()[1]);
        assert.equal(5, game.getEmptySquares()[2]);
        assert.equal(6, game.getEmptySquares()[3]);
        assert.equal(7, game.getEmptySquares()[4]);
        assert.equal(8, game.getEmptySquares()[5]);
    });
})

describe ("Testar computerMove", function () {
    let game;
    this.beforeEach(function() {
        game = new TicTacToe();
    }); 
        

    it("computerMove() returns ether 0, 5 or 8 when squareStatus[0,5,8] is empty and rest is occupied", function(){

        game.squaresStatus = game.squaresStatus.map (_ => "O");
        game.squaresStatus[0] = "";
        game.squaresStatus[5] = "";
        game.squaresStatus[8] = "";

        assert.equal("", game.squaresStatus[0]);
        assert.equal("O", game.squaresStatus[1]);
        assert.equal("O", game.squaresStatus[2]);
        assert.equal("O", game.squaresStatus[3]);
        assert.equal("O", game.squaresStatus[4]);
        assert.equal("", game.squaresStatus[5]);
        assert.equal("O", game.squaresStatus[6]);
        assert.equal("O", game.squaresStatus[7]);
        assert.equal("", game.squaresStatus[8]); 

        expect(game.computerMove()).to.be.oneOf([0, 5, 8]);
       
    });

    it("computerMove() should not return 1,2,3,4,6 or 7 when squareStatus[1,2,3,4,6,7] is occupied and rest is empty", function(){
        game.squaresStatus = game.squaresStatus.map (_ => "O");
        game.squaresStatus[0] = "";
        game.squaresStatus[5] = "";
        game.squaresStatus[8] = "";

        assert.equal("", game.squaresStatus[0]);
        assert.equal("O", game.squaresStatus[1]);
        assert.equal("O", game.squaresStatus[2]);
        assert.equal("O", game.squaresStatus[3]);
        assert.equal("O", game.squaresStatus[4]);
        assert.equal("", game.squaresStatus[5]);
        assert.equal("O", game.squaresStatus[6]);
        assert.equal("O", game.squaresStatus[7]);
        assert.equal("", game.squaresStatus[8]); 

        expect(game.computerMove()).to.not.be.oneOf([1,2,3,4,6,7]); 
    });
})

