export default class Square {
  constructor(row, column, piece = null) {
    this.index = (row * 8) + column;
    this.row = row;
    this.column = column;
    this.piece = piece;
    this.bgColor = this.defaultBgColor();
  }

  defaultBgColor() {
    if (this.row % 2 === 0) {
      return this.column % 2 === 0 ? 'bg-[#F0D9B5]' : 'bg-[#B58863]';
    } else {
      return this.column % 2 === 0 ? 'bg-[#B58863]' : 'bg-[#F0D9B5]';
    }
  }

  possibleMoves(squares) {
    if (this.piece) {
      return this.piece.possibleMoves(squares, this.index);
    }

    return false;
  }
}
