export default class Piece {
  constructor(color, pieceName) {
    this.color = color;
    this.hasMoved = false;
    this.image = `/images/${pieceName}-${color}.png`;
    this.name = `${color} ${pieceName}`;
  }

  pieceAtSquare(squares, index) {
    return squares[index] && squares[index].piece;
  }

  teamPieceAtSquare(squares, index) {
    return this.pieceAtSquare(squares, index) && squares[index].piece.color === this.color;
  }

  enemyPieceAtSquare(squares, index) {
    return this.pieceAtSquare(squares, index) && squares[index].piece.color !== this.color;
  }

  atLeftBorder(position) {
    return position % 8 === 0;
  }

  atRightBorder(position) {
    return (position + 1) % 8 === 0;
  }

  atTopBorder(position) {
    return position < 8;
  }

  atBottomBorder(position) {
    return position > 55;
  }
}
