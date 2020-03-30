class Board {
  constructor () {
    this.rows = 6;
    this.columns = 7;
    this.spaces = this.createSpaces();
  }

 /**
  * Generates 2d Array of Spaces
  * @return {array} An array of space objects
  */
  createSpaces () {
    const spaces = [];

    for (let x = 0; x < this.columns; x++) {
      const column = [];

      for (let y = 0; y < this.rows; y++) {
        const space = new Space(x, y);
        column.push(space);
      }

      spaces.push(column);
      
    }

    return spaces;
  }

  /**
   * Invoking every single spaces drawSVGSpace method.
   */
  drawHTMLBoard () {

    for (let x = 0; x < this.spaces.length; x++) {

      for (let y = 0; y < this.spaces[x].length; y++) {
        this.spaces[x][y].drawSVGSpace();
      }
      
    }

  }
}