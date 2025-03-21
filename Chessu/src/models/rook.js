import Piece from './piece'

export default class Rook extends Piece {
  constructor(color, position) {
    super(color, 'rook')
    this.className = 'Rook';
  }

  possibleMoves(squares, currentPosition) {
    const possibilities = [];
    let possibleMove;

    // Move up
    possibleMove = currentPosition - 8;
    while(possibleMove >= 0) {
      if (this.enemyPieceAtSquare(squares, possibleMove)) {
        possibilities.push(possibleMove);
        break;
      } else if (this.pieceAtSquare(squares, possibleMove)) {
        break;
      } else {
        possibilities.push(possibleMove);
      }
      possibleMove -= 8;
    }

    // Move down
    possibleMove = currentPosition + 8;
    while(possibleMove < 64) {
      if (this.enemyPieceAtSquare(squares, possibleMove)) {
        possibilities.push(possibleMove);
        break;
      } else if (this.pieceAtSquare(squares, possibleMove)) {
        break;
      } else {
        possibilities.push(possibleMove);
      }
      possibleMove += 8;
    }

    // Move left
    possibleMove = currentPosition;
    while(possibleMove % 8 !== 0) {
      possibleMove -= 1;
      if (this.enemyPieceAtSquare(squares, possibleMove)) {
        possibilities.push(possibleMove);
        break;
      } else if (this.pieceAtSquare(squares, possibleMove)) {
        break;
      } else {
        possibilities.push(possibleMove);
      }
    }

    // Move right
    possibleMove = currentPosition;
    while((possibleMove + 1) % 8 !== 0) {
      possibleMove += 1;
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
