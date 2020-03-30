class Player {
  constructor (name, id, color, active=false) {
    this.name = name;
    this.id = id;
    this.color = color;
    this.active = active;
    this.tokens = this.createToken(21);
  }
  /**
   * 
   * @param {integer} times  - times of token to be created for the player
   */
  createToken (times) {
    const tokens =  []
    for (let i = 0; i < times; i++) {
        let token = new Token(i, this);
        tokens.push(token)
    }

    return tokens
  }
  /**
   * @return {array} returning array of unused tokens
   */
  get unusedTokens () {
    return this.tokens.filter(token => !token.dropped);
  }

  get activeToken () {
    return this.unusedTokens[0];
  } 

  checkTokens(){
    return this.unusedTokens.length === 0 ? false : true;
  }


}