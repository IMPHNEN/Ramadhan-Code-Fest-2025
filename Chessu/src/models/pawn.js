import Piece from './piece';

export default class Pawn extends Piece {
  constructor(color) {
    super(color, 'pawn');
    this.className = 'Pawn';
  }

  possibleMoves(squares, currentPosition) {
    const possibilities = [];
    let possibleMove;
    // White pieces move up the board
    // Black pieces move down the board
    let baseMovement = this.color === 'white' ? -8 : 8;

    // Pawns can move up one unless there is a piece in the way
    possibleMove = currentPosition + baseMovement;
    if (!this.pieceAtSquare(squares, possibleMove)) {
      possibilities.push(possibleMove);

      // If the Pawn hasn't moved yet it can move up two unless there is a piece in the way
      possibleMove += baseMovement;
      if (!this.hasMoved && !this.pieceAtSquare(squares, possibleMove)) {
        possibilities.push(possibleMove);
      }
    }

    // If there is an enemy at the left diagonal of the pawn then we can strike it
    possibleMove = currentPosition + baseMovement - 1;
    if (this.enemyPieceAtSquare(squares, possibleMove)) {
      possibilities.push(possibleMove);
    }

    // If there is an enemy at the left diagonal of the pawn then we can strike it
    possibleMove = currentPosition + baseMovement + 1;
    if (this.enemyPieceAtSquare(squares, possibleMove)) {
      possibilities.push(possibleMove);
    }

    return possibilities;
  }

  inFifthRank(currentPosition) {
    if (this.color === 'black') {
      return [32, 33, 34, 35, 36, 37, 38, 39].includes(currentPosition);
    } else {
      return [24, 25, 26, 27, 28, 29, 30, 31].includes(currentPosition);
    }
  }
}
