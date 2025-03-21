import Piece from './piece';

export default class Knight extends Piece {
  constructor(color) {
    super(color, 'knight');
    this.className = 'Knight';
  }

  possibleMoves(squares, currentPosition) {
    const possibilities = [];
    let possibleMove;

    if (this.canMoveUp(currentPosition, 2)) {
      // Check 2 up, 1 left move
      possibleMove = currentPosition - 17;
      if (this.canMoveLeft(currentPosition, 1) && !this.teamPieceAtSquare(squares, possibleMove)) {
        possibilities.push(possibleMove);
      }

      // Check 2 up, 1 right move
      possibleMove = currentPosition - 15;
      if (this.canMoveRight(currentPosition, 1) && !this.teamPieceAtSquare(squares, possibleMove)) {
        possibilities.push(possibleMove);
      }
    }

    if (this.canMoveUp(currentPosition, 1)) {
      // Check 1 up, 2 left move
      possibleMove = currentPosition - 10;
      if (this.canMoveLeft(currentPosition, 2) && !this.teamPieceAtSquare(squares, possibleMove)) {
        possibilities.push(possibleMove);
      }

      // Check 1 up, 2 right move
      possibleMove = currentPosition - 6;
      if (this.canMoveRight(currentPosition, 2) && !this.teamPieceAtSquare(squares, possibleMove)) {
        possibilities.push(possibleMove);
      }
    }

    if (this.canMoveDown(currentPosition, 2)) {
      // Check 2 down, 1 left move
      possibleMove = currentPosition + 15;
      if (this.canMoveLeft(currentPosition, 1) && !this.teamPieceAtSquare(squares, possibleMove)) {
        possibilities.push(possibleMove);
      }

      // Check 2 down, 1 right move
      possibleMove = currentPosition + 17;
      if (this.canMoveRight(currentPosition, 1) && !this.teamPieceAtSquare(squares, possibleMove)) {
        possibilities.push(possibleMove);
      }
    }

    if (this.canMoveDown(currentPosition, 1)) {
      // Check 1 down, 2 left move
      possibleMove = currentPosition + 6;
      if (this.canMoveLeft(currentPosition, 2) && !this.teamPieceAtSquare(squares, possibleMove)) {
        possibilities.push(possibleMove);
      }


      // Check 1 down, 2 right move
      possibleMove = currentPosition + 10;
      if (this.canMoveRight(currentPosition, 2) && !this.teamPieceAtSquare(squares, possibleMove)) {
        possibilities.push(possibleMove);
      }
    }

    return possibilities;
  }

  canMoveUp(currentPosition, spaces = 1) {
    if (spaces === 2) {
      return currentPosition > 15;
    } else {
      return currentPosition > 7;
    }
  }

  canMoveLeft(currentPosition, spaces = 1) {
    if (spaces === 2) {
      return (currentPosition - 1) % 8 !== 0 && currentPosition % 8 !== 0;
    } else {
      return currentPosition % 8 !== 0;
    }
  }

  canMoveRight(currentPosition, spaces = 1) {
    if (spaces === 2) {
      return (currentPosition + 2) % 8 !== 0 && (currentPosition + 1) % 8 !== 0;
    } else {
      return (currentPosition + 1) % 8 !== 0;
    }
  }

  canMoveDown(currentPosition, spaces = 2) {
    if (spaces === 2) {
      return currentPosition < 48;
    } else {
      return currentPosition < 56;
    }
  }
}
