class Game {
  constructor () {
    this.board = new Board();
    this.players = this.createPlayers();
    this.ready = false;
  }

  
  get activePlayer () {
    return this.players.find(player => player.active);
  }

  updateGameState(token, target) {
    
    target.mark(token);

    if (!this.checkForWin(target)) {
      

      // console.log(this.players)
      this.switchPlayers();

      // console.log(this.players)

      if(this.activePlayer.checkTokens()) {
        this.activePlayer.activeToken.drawHTMLToken();
        this.ready = true;
      } else {
        this.gameOver('No more token!')
      }
    } else {
      this.gameOver(`${target.owner.name} wins!`)
    }
  }

  /**
   * @return {array} an array of two players object
   */
  createPlayers () {
    const players = [new Player('Player 1', 1, 'skyblue', true),
                     new Player('Player 2', 2, 'crimson')]

    return players;            

  }
  /**
   * Gets game ready to play
   */
  startGame () {
    this.board.drawHTMLBoard();
    this.ready = true;
    this.activePlayer.activeToken.drawHTMLToken();
  }
  
  /**
   * 
   * @param {object} e - keydown event object 
   */
  handleKeyDown(e) {
    if(this.ready) {
      if (e.key === "ArrowLeft") {
        // move left
        this.activePlayer.activeToken.moveLeft();
      } else if (e.key === "ArrowRight") {
        // move right
        this.activePlayer.activeToken.moveRight(this.board.columns);
      } else if (e.key === "ArrowDown") {
        // play token
        this.playToken();
      };
    };
  } 

  /**
   * switch active player
   */
  switchPlayers () {
    // this.players.forEach()
    for (let idx in this.players) {
      this.players[idx].active = !this.players[idx].active;
    }
    // this.players = this.players.map(player => ({...player, active: !player.active}))
  }

  gameOver(message) {
    document.getElementById('game-over').style.display = 'block';
    document.getElementById('game-over').textContent = message;
  }

  playToken () {
    let spaces = this.board.spaces;
    let activeToken = this.activePlayer.activeToken;
    let targetColumn = spaces[activeToken.columnLocation];
    let targetSpace = null;

    for (let space of targetColumn) {
      if(space.token === null) {
        targetSpace = space;
      }
    }

    if  (targetSpace !== null) {
      game.ready = false;
      activeToken.drop(targetSpace,function(){
        game.updateGameState(activeToken, targetSpace);           
    });  
    }

  }

   /** 
 * Checks if there a winner on the board after each token drop.
 * @param   {Object}    Targeted space for dropped token.
 * @return  {boolean}   Boolean value indicating whether the game has been won (true) or not (false)
 */

checkForWin(target){
  const owner = target.token.owner;
  let win = false;

  // vertical
  for (let x = 0; x < this.board.columns; x++ ){
      for (let y = 0; y < this.board.rows - 3; y++){
          if (this.board.spaces[x][y].owner === owner && 
              this.board.spaces[x][y+1].owner === owner && 
              this.board.spaces[x][y+2].owner === owner && 
              this.board.spaces[x][y+3].owner === owner) {
                  win = true;
          }           
      }
  }

  // horizontal
  for (let x = 0; x < this.board.columns - 3; x++ ){
      for (let y = 0; y < this.board.rows; y++){
          if (this.board.spaces[x][y].owner === owner && 
              this.board.spaces[x+1][y].owner === owner && 
              this.board.spaces[x+2][y].owner === owner && 
              this.board.spaces[x+3][y].owner === owner) {
                  win = true;
          }           
      }
  }

  // diagonal
  for (let x = 3; x < this.board.columns; x++ ){
      for (let y = 0; y < this.board.rows - 3; y++){
          if (this.board.spaces[x][y].owner === owner && 
              this.board.spaces[x-1][y+1].owner === owner && 
              this.board.spaces[x-2][y+2].owner === owner && 
              this.board.spaces[x-3][y+3].owner === owner) {
                  win = true;
          }           
      }
  }

  // diagonal
  for (let x = 3; x < this.board.columns; x++ ){
      for (let y = 3; y < this.board.rows; y++){
          if (this.board.spaces[x][y].owner === owner && 
              this.board.spaces[x-1][y-1].owner === owner && 
              this.board.spaces[x-2][y-2].owner === owner && 
              this.board.spaces[x-3][y-3].owner === owner) {
                  win = true;
          }           
      }
  }

  return win;
}


}