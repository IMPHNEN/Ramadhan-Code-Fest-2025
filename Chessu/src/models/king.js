import Piece from './piece';

export default class King extends Piece {
  constructor(color) {
    super(color, 'king');
    this.className = 'King';
  }

  possibleMoves(squares, currentPosition) {
    const possibilities = [];
    let possibleMove;

    if (!this.atTopBorder(currentPosition)) {
      // Check up move
      possibleMove = currentPosition - 8;
      if (!this.teamPieceAtSquare(squares, possibleMove)) {
        possibilities.push(possibleMove);
      }

      // Check directly up left diagonal move
      possibleMove = currentPosition - 9;
      if (!this.atLeftBorder(currentPosition) && !this.teamPieceAtSquare(squares, possibleMove)) {
        possibilities.push(possibleMove);
      }

      // Check directly up right diagonal move
      possibleMove = currentPosition - 7;
      if (!this.atRightBorder(currentPosition) && !this.teamPieceAtSquare(squares, possibleMove)) {
        possibilities.push(possibleMove);
      }
    }

    // Check left move
    possibleMove = currentPosition - 1;
    if (!this.atLeftBorder(currentPosition) && !this.teamPieceAtSquare(squares, possibleMove)) {
      possibilities.push(possibleMove);
    }

    // Check right move
    possibleMove = currentPosition + 1;
    if (!this.atRightBorder(currentPosition) && !this.teamPieceAtSquare(squares, possibleMove)) {
      possibilities.push(possibleMove);
    }

    if (!this.atBottomBorder(currentPosition)) {
      // Check down move
      possibleMove = currentPosition + 8;
      if (!this.teamPieceAtSquare(squares, possibleMove)) {
        possibilities.push(possibleMove);
      }

      // Check directly down left diagonal move
      possibleMove = currentPosition + 7;
      if (!this.atLeftBorder(currentPosition) && !this.teamPieceAtSquare(squares, possibleMove)) {
        possibilities.push(possibleMove);
      }

      // Check directly down right diagonal move
      possibleMove = currentPosition + 9;
      if (!this.atRightBorder(currentPosition) && !this.teamPieceAtSquare(squares, possibleMove)) {
        possibilities.push(possibleMove);
      }
    }

    return possibilities;
  }
}
