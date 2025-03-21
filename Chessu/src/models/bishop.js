import Piece from './piece';

export default class Bishop extends Piece {
  constructor(color) {
    super(color, 'bishop');
    this.className = 'Bishop';
  }

  possibleMoves(squares, currentPosition) {
    const possibilities = [];
    let possibleMove;

    // Add moves from the top left diagonal
    possibleMove = currentPosition;
    while (!this.atLeftBorder(possibleMove) && !this.atTopBorder(possibleMove)) {
      possibleMove -= 9;
      if (this.enemyPieceAtSquare(squares, possibleMove)) {
        possibilities.push(possibleMove);
        break;
      } else if (this.pieceAtSquare(squares, possibleMove)) {
        break;
      } else {
        possibilities.push(possibleMove);
      }
    }

    // Add moves from the top right diagonal
    possibleMove = currentPosition;
    while (!this.atRightBorder(possibleMove) && !this.atTopBorder(possibleMove)) {
      possibleMove -= 7;

      if (this.enemyPieceAtSquare(squares, possibleMove)) {
        possibilities.push(possibleMove);
        break;
      } else if (this.pieceAtSquare(squares, possibleMove)) {
        break;
      } else {
        possibilities.push(possibleMove);
      }
    }

    // Add moves from the bottom left diagonal
    possibleMove = currentPosition;
    while (!this.atLeftBorder(possibleMove) && !this.atBottomBorder(possibleMove)) {
      possibleMove += 7;

      if (this.enemyPieceAtSquare(squares, possibleMove)) {
        possibilities.push(possibleMove);
        break;
      } else if (this.pieceAtSquare(squares, possibleMove)) {
        break;
      } else {
        possibilities.push(possibleMove);
      }
    }

    // Add moves from the bottom right diagonal
    possibleMove = currentPosition;
    while (!this.atRightBorder(possibleMove) && !this.atBottomBorder(possibleMove)) {
      possibleMove += 9;

      if (this.enemyPieceAtSquare(squares, possibleMove)) {
        possibilities.push(possibleMove);
        break;
      } else if (this.pieceAtSquare(squares, possibleMove)) {
        break;
      } else {
        possibilities.push(possibleMove);
      }
    }

    return possibilities;
  }
}
