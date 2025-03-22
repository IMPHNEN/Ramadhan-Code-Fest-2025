import Piece from './piece';

export default class Queen extends Piece {
  constructor(color, position) {
    super(color, 'queen');
    this.className = 'Queen';
  }

  possibleMoves(squares, currentPosition) {
    const possibilities = [];
    let step = 1;
    let indexAtPosition;
    let centerMovePossible = !this.atTopBorder(currentPosition);
    let leftMovePossible = !this.atLeftBorder(currentPosition);
    let rightMovePossible = !this.atRightBorder(currentPosition);

    // Move up
    while(this.indexAtCenter(currentPosition, step, 'up') >= 0) {
      if (leftMovePossible) {
        indexAtPosition = this.indexAtLeftDiagonal(currentPosition, step, 'up');

        if (this.enemyPieceAtSquare(squares, indexAtPosition)) {
          possibilities.push(indexAtPosition);
          leftMovePossible = false;
        } else if (this.pieceAtSquare(squares, indexAtPosition)) {
          leftMovePossible = false;
        } else if (this.atLeftBorder(indexAtPosition)) {
          possibilities.push(indexAtPosition);
          leftMovePossible = false;
        } else {
          possibilities.push(indexAtPosition);
        }
      }

      if (centerMovePossible) {
        indexAtPosition = this.indexAtCenter(currentPosition, step, 'up');

        if (this.enemyPieceAtSquare(squares, indexAtPosition)) {
          possibilities.push(indexAtPosition);
          centerMovePossible = false;
        } else if (this.pieceAtSquare(squares, indexAtPosition)) {
          centerMovePossible = false;
        } else if (this.atTopBorder(indexAtPosition)) {
          possibilities.push(indexAtPosition);
          centerMovePossible = false;
        } else {
          possibilities.push(indexAtPosition);
        }
      }

      if (rightMovePossible) {
        indexAtPosition = this.indexAtRightDiagonal(currentPosition, step, 'up');

        if (this.enemyPieceAtSquare(squares, indexAtPosition)) {
          possibilities.push(indexAtPosition);
          rightMovePossible = false;
        } else if (this.pieceAtSquare(squares, indexAtPosition)) {
          rightMovePossible = false;
        } else if (this.atRightBorder(indexAtPosition)) {
          possibilities.push(indexAtPosition);
          rightMovePossible = false;
        } else {
          possibilities.push(indexAtPosition);
        }
      }

      step += 1;
    }

    // Move down
    step = 1;
    centerMovePossible = !this.atBottomBorder(currentPosition);
    leftMovePossible = !this.atLeftBorder(currentPosition);
    rightMovePossible = !this.atRightBorder(currentPosition);

    while(this.indexAtCenter(currentPosition, step, 'down') < 64) {
      if (leftMovePossible) {
        indexAtPosition = this.indexAtLeftDiagonal(currentPosition, step, 'down');

        if (this.enemyPieceAtSquare(squares, indexAtPosition)) {
          possibilities.push(indexAtPosition);
          leftMovePossible = false;
        } else if (this.pieceAtSquare(squares, indexAtPosition)) {
          leftMovePossible = false;
        } else if (this.atLeftBorder(indexAtPosition)) {
          possibilities.push(indexAtPosition);
          leftMovePossible = false;
        } else {
          possibilities.push(indexAtPosition);
        }
      }

      if (centerMovePossible) {
        indexAtPosition = this.indexAtCenter(currentPosition, step, 'down');

        if (this.enemyPieceAtSquare(squares, indexAtPosition)) {
          possibilities.push(indexAtPosition);
          centerMovePossible = false;
        } else if (this.pieceAtSquare(squares, indexAtPosition)) {
          centerMovePossible = false;
        } else if (this.atBottomBorder(indexAtPosition)) {
          possibilities.push(indexAtPosition);
          centerMovePossible = false;
        } else {
          possibilities.push(indexAtPosition);
        }
      }

      if (rightMovePossible) {
        indexAtPosition = this.indexAtRightDiagonal(currentPosition, step, 'down');

        if (this.enemyPieceAtSquare(squares, indexAtPosition)) {
          possibilities.push(indexAtPosition);
          rightMovePossible = false;
        } else if (this.pieceAtSquare(squares, indexAtPosition)) {
          rightMovePossible = false;
        } else if (this.atRightBorder(indexAtPosition)) {
          possibilities.push(indexAtPosition);
          rightMovePossible = false;
        } else {
          possibilities.push(indexAtPosition);
        }
      }

      step += 1;
    }

    // Move horizontal
    step = 1;
    let canMoveLeft = !this.atLeftBorder(currentPosition);
    let canMoveRight = !this.atRightBorder(currentPosition);
    while (canMoveLeft || canMoveRight) {
      if (canMoveLeft) {
        indexAtPosition = currentPosition - step;
        if (this.enemyPieceAtSquare(squares, indexAtPosition)) {
          possibilities.push(indexAtPosition);
          canMoveLeft = false;
        } else if (this.pieceAtSquare(squares, indexAtPosition)) {
          canMoveLeft = false;
        } else if (this.atLeftBorder(indexAtPosition)) {
          possibilities.push(indexAtPosition);
          canMoveLeft = false;
        } else {
          possibilities.push(indexAtPosition);
        }
      }

      if (canMoveRight) {
        indexAtPosition = currentPosition + step;
        if (this.enemyPieceAtSquare(squares, indexAtPosition)) {
          possibilities.push(indexAtPosition);
          canMoveRight = false;
        } else if (this.pieceAtSquare(squares, indexAtPosition)) {
          canMoveRight = false;
        } else if (this.atRightBorder(indexAtPosition)) {
          possibilities.push(indexAtPosition);
          canMoveRight = false;
        } else {
          possibilities.push(indexAtPosition);
        }
      }

      step += 1;
    }

    return possibilities;
  }

  indexAtCenter(currentPosition, step, direction) {
    if (direction === 'up') {
      return currentPosition - (8 * step);
    } else if (direction === 'down') {
      return currentPosition + (8 * step);
    }
  }

  indexAtLeftDiagonal(currentPosition, step, direction) {
    if (direction === 'up') {
      return currentPosition - (8 * step) - step;
    } else if (direction === 'down') {
      return currentPosition + (8 * step) - step;
    }
  }

  indexAtRightDiagonal(currentPosition, step, direction) {
    if (direction === 'up') {
      return currentPosition - (8 * step) + step;
    } else if (direction === 'down') {
      return currentPosition + (8 * step) + step;
    }
  }
}
