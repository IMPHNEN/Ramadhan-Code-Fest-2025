import React from 'react';
import Board from './Board';
import Knight from '../models/knight';
import Bishop from '../models/bishop';
import King from '../models/king';
import Queen from '../models/queen';
import Rook from '../models/rook';
import Pawn from '../models/pawn';
import History from '../models/history';
import Player from '../models/player';
import Square from '../models/square';
import cloneDeep from 'lodash/cloneDeep';

export default class Game extends React.Component {
  constructor(props) {
    super(props);

    const players = this.setPlayers();

    this.state = {
      squares: this.initializeBoard(),
      message: 'Welcome! White\'s turn.',
      players: players,
      current: players['white'],
      selectedSquare: null,
      whiteGraveyard: [],
      blackGraveyard: [],
      history: new History(),
      check: false,
      checkmate: false,
      showModal: false,
      modalMessage: '',
    };
  }

  initializeBoard() {
    let squares = Array(64).fill(null);

    // Black pieces
    squares[0] = new Square(0, 0, new Rook('black'));
    squares[1] = new Square(0, 1, new Knight('black'));
    squares[2] = new Square(0, 2, new Bishop('black'));
    squares[3] = new Square(0, 3, new Queen('black'));
    squares[4] = new Square(0, 4, new King('black'));
    squares[5] = new Square(0, 5, new Bishop('black'));
    squares[6] = new Square(0, 6, new Knight('black'));
    squares[7] = new Square(0, 7, new Rook('black'));

    // Black pawns
    squares[8] = new Square(1, 0, new Pawn('black'));
    squares[9] = new Square(1, 1, new Pawn('black'));
    squares[10] = new Square(1, 2, new Pawn('black'));
    squares[11] = new Square(1, 3, new Pawn('black'));
    squares[12] = new Square(1, 4, new Pawn('black'));
    squares[13] = new Square(1, 5, new Pawn('black'));
    squares[14] = new Square(1, 6, new Pawn('black'));
    squares[15] = new Square(1, 7, new Pawn('black'));

    let index = 16;
    for (let row = 2; row < 6; row++) {
      for (let col = 0; col < 8; col++) {
        squares[index] = new Square(row, col);
        index += 1;
      }
    }

    // White pieces
    squares[56] = new Square(7, 0, new Rook('white'));
    squares[57] = new Square(7, 1, new Knight('white'));
    squares[58] = new Square(7, 2, new Bishop('white'));
    squares[59] = new Square(7, 3, new Queen('white'));
    squares[60] = new Square(7, 4, new King('white'));
    squares[61] = new Square(7, 5, new Bishop('white'));
    squares[62] = new Square(7, 6, new Knight('white'));
    squares[63] = new Square(7, 7, new Rook('white'));

    // White pawns
    squares[48] = new Square(6, 0, new Pawn('white'));
    squares[49] = new Square(6, 1, new Pawn('white'));
    squares[50] = new Square(6, 2, new Pawn('white'));
    squares[51] = new Square(6, 3, new Pawn('white'));
    squares[52] = new Square(6, 4, new Pawn('white'));
    squares[53] = new Square(6, 5, new Pawn('white'));
    squares[54] = new Square(6, 6, new Pawn('white'));
    squares[55] = new Square(6, 7, new Pawn('white'));

    return squares;
  }

  pieces(squares, color) {
    const pieces = [];

    for (let i = 0; i < squares.length; i++) {
      if (squares[i].piece && squares[i].piece.color === color) {
        pieces.push(squares[i]);
      }
    }

    return pieces;
  }

  setPlayers() {
    let players = {};
    players['white'] = new Player('white');
    players['black'] = new Player('black');
    return players;
  }

  validateMove(selectedSquare, destinationSquare) {
    return (
      selectedSquare.possibleMoves(this.state.squares).includes(destinationSquare.index)
      // Make sure the move doesn't put themself in check
      && !this.check(this.previewMove(selectedSquare, destinationSquare), this.state.current)
    );
  }

  previewMove(selectedSquare, destinationSquare, initSquares = this.state.squares) {
    let squares = cloneDeep(initSquares);
    squares[destinationSquare.index].piece = selectedSquare.piece;
    squares[selectedSquare.index].piece = null;

    return squares;
  }

  validateSelectedSquare(square) {
    return square.piece?.color === this.state.current.color;
  }

  handleClick(squareClicked) {
    let selectedSquare = this.state.selectedSquare;

    // If user clicked on a square with a piece that belongs to them, mark it selected
    if (this.validateSelectedSquare(squareClicked)) {
      return this.selectSquare(squareClicked);
      // Make move if piece is already selected and valid move
    } else if (selectedSquare && this.validateMove(selectedSquare, squareClicked)) {
      return this.movePiece(selectedSquare, squareClicked);
      // Check if user was trying to castle
    } else if (selectedSquare && this.canCastle(selectedSquare, squareClicked)) {
      return this.movePiece(selectedSquare, squareClicked, { castle: true });
      // Check if user was trying to en passant
    } else if (selectedSquare && this.canEnPassant(selectedSquare, squareClicked)) {
      return this.movePiece(selectedSquare, squareClicked, { enpassant: true });
      // If piece was selected then the move was invalid
    } else if (selectedSquare) {
      return this.setState(oldState => ({
        message: 'You cannot move there.'
      }));
      // Else user wasn't allowed to click the square
    } else {
      return this.setState(oldState => ({
        message: `Please select one of the ${this.state.current.color} pieces to move.`
      }));
    }
  }

  movePiece(selectedSquare, destinationSquare, options = {}) {
    let history = this.state.history;
    let current = this.state.current;
    let squares = this.state.squares;
    let blackGraveyard = this.state.blackGraveyard;
    let whiteGraveyard = this.state.whiteGraveyard;
    let capture = false;
    let promotion = false;

    // Add pieces to the graveyard that have been killed
    if (destinationSquare.piece?.color === 'white') {
      whiteGraveyard.push(destinationSquare.piece);
      capture = true;
    } else if (destinationSquare.piece?.color === 'black') {
      blackGraveyard.push(destinationSquare.piece);
      capture = true;
    }

    // Castling logic to move the Rook into position, if we are indeed castling here
    if (options.castle) {
      let rookSquare = this.getCastlingRook(selectedSquare, destinationSquare);

      if (selectedSquare.index > destinationSquare.index) {
        squares[destinationSquare.index + 1].piece = rookSquare.piece;
        rookSquare.piece = null;
      } else {
        squares[destinationSquare.index - 1].piece = rookSquare.piece;
        rookSquare.piece = null;
      }
    }

    // En passant logic to capture piece is we are indeed doing an en passant move
    if (options.enpassant) {
      let enPassantSquare = this.getEnPassantPawn(selectedSquare, destinationSquare);

      // Add pieces to the graveyard that have been killed
      if (enPassantSquare.piece.color === 'white') {
        whiteGraveyard.push(enPassantSquare.piece);
        capture = true;
      } else if (enPassantSquare.piece.color === 'black') {
        blackGraveyard.push(enPassantSquare.piece);
        capture = true;
      }

      enPassantSquare.piece = null;
    }

    // Physically move the piece
    destinationSquare.piece = selectedSquare.piece;
    selectedSquare.piece = null;
    // Mark piece as having moved
    destinationSquare.piece.hasMoved = true;

    if (this.promotion(destinationSquare)) {
      promotion = true;
      destinationSquare.piece = new Queen(current.color);
    }

    // Setting up for the next player's turn
    let nextPlayer = current.color === 'white' ? this.state.players['black'] : this.state.players['white'];
    let check = this.check(squares, nextPlayer);
    let checkmate = false;
    if (check) {
      checkmate = this.checkmate(squares, nextPlayer);
    }
    let message = `${nextPlayer.color}'s turn. Please select a piece to move.`;

    if (checkmate) {
      this.setState({
        showModal: true,
        modalMessage: `Congrats to ${current.color}. You won!`,
      });
    }

    // Updating game record
    history.logMove({ current: current, piece: destinationSquare.piece, move_to: destinationSquare.index, move_from: selectedSquare.index, check: check, checkmate: checkmate, capture: capture, promotion: promotion, castle: options.castle, enpassant: options.enpassant });

    this.setState(oldState => ({
      squares: squares,
      current: nextPlayer,
      message: message,
      selectedSquare: null,
      history: history,
      blackGraveyard: blackGraveyard,
      whiteGraveyard: whiteGraveyard,
      check: check,
      checkmate: checkmate
    }));
  }

  selectSquare(square) {
    this.setState(oldState => ({
      message: `Select where to move ${square.piece.name}`,
      selectedSquare: square
    }));
  }

  check(squares, player) {
    let kingSquare = squares.find((square) => square.piece?.name === `${player.color} king`);
    let enemySquares = this.pieces(squares, player.color === 'white' ? 'black' : 'white');

    // Cycle through the enemy pieces
    for (let idx = 0; idx < enemySquares.length; idx++) {
      let enemySquare = enemySquares[idx];

      // If any of the enemy pieces has a possible move that includes the king square, return true, check
      if (enemySquare.possibleMoves(squares).includes(kingSquare.index)) {
        return true;
      }
    }

    // Otherwise no check
    return false;
  }

  checkmate(squares, player) {
    let teammates = this.pieces(squares, player.color);

    // Cycle through the teammates...
    for (let x = 0; x < teammates.length; x++) {
      let teammate = teammates[x];
      let possibleMoves = teammate.possibleMoves(squares);

      // Go through each teammate's possible moves...
      for (let y = 0; y < possibleMoves.length; y++) {
        let availableMove = possibleMoves[y];

        // If any move gets the King out of check then return false, no checkmate
        if (!this.check(this.previewMove(teammate, squares[availableMove], squares), player)) {
          return false;
        }
      }
    }

    // Otherwise return true. No possible moves left.
    return true;
  }

  promotion(square) {
    if (square.piece.className !== 'Pawn') {
      return false;
    }

    if (square.piece.color === 'black') {
      if (square.row === 7) {
        return true;
      }
    } else {
      if (square.row === 0) {
        return true;
      }
    }

    return false;
  }

  canEnPassant(selectedSquare, destinationSquare) {
    let enemyPawnSquare = this.getEnPassantPawn(selectedSquare, destinationSquare);
    let lastMove = this.state.history.lastMove();

    // Selected piece must be a pawn
    if (selectedSquare.piece.className !== 'Pawn') {
      return false;
    }

    // Selected piece must be in the fifth rank per en passant rules
    // https://en.wikipedia.org/wiki/En_passant
    if (!selectedSquare.piece.inFifthRank(selectedSquare.index)) {
      return false;
    }

    if (selectedSquare.piece.color === 'black') {
      // Check if piece is trying to move diagonal
      if (destinationSquare.index !== selectedSquare.index + 9 && destinationSquare.index !== selectedSquare.index + 7) {
        return false;
      }
    } else {
      // Check if piece is trying to move diagonal
      if (destinationSquare.index !== selectedSquare.index - 9 && destinationSquare.index !== selectedSquare.index - 7) {
        return false;
      }
    }

    // Check if piece we're trying to take is an enemy
    if (enemyPawnSquare.piece?.color === selectedSquare.piece.color) {
      return false;
    }

    // Check enemy piece is a pawn
    if (enemyPawnSquare.piece?.className !== 'Pawn') {
      return false;
    }

    // Ensure the piece we're trying to take indeed made the last move and it was a double move
    if (lastMove.move_to !== enemyPawnSquare.index) {
      return false;
    }

    // Check if the last move was a pawn double move
    if (Math.abs(lastMove.move_from - lastMove.move_to) !== 16) {
      return false;
    }

    return true;
  }

  canCastle(selectedSquare, destinationSquare) {
    // Selected piece must be a king
    if (selectedSquare.piece.className !== 'King') {
      return false;
    }

    // King must not have moved yet
    if (selectedSquare.piece.hasMoved) {
      return false;
    }

    // There are only two ways to castle, king or queen side, hardcoded the allowed spaces to castle
    if (selectedSquare.piece.color === 'black') {
      if (![2, 6].includes(destinationSquare.index)) {
        return false;
      }
    } else {
      if (![58, 62].includes(destinationSquare.index)) {
        return false;
      }
    }

    // Current player must not be in check
    if (this.check(this.state.squares, this.state.current)) {
      return false;
    }

    // Rook must not have been moved yet
    let rookSquare = this.getCastlingRook(selectedSquare, destinationSquare);
    if (rookSquare.piece.hasMoved) {
      return false;
    }

    // Squares between the king and the rook must be empty
    let squaresBetweenKingAndRook = this.squaresBetweenLocations(selectedSquare, rookSquare);
    for (let i = 0; i < squaresBetweenKingAndRook.length; i++) {
      if (squaresBetweenKingAndRook[i].piece) {
        return false;
      }
    }

    let squaresBetweenKingAndDestination = this.squaresBetweenLocations(selectedSquare, destinationSquare);
    let enemySquares = this.pieces(this.state.squares, this.state.current.color === 'white' ? 'black' : 'white');
    for (let i = 0; i < enemySquares.length; i++) {
      let possibleMoves = enemySquares[i].possibleMoves(this.state.squares);

      // Make sure no enemy pieces threaten the spaces that the king will move over
      for (let j = 0; j < squaresBetweenKingAndDestination.length; j++) {
        if (possibleMoves.includes(squaresBetweenKingAndDestination[j])) {
          return false;
        }
      }

      // Make sure the destination square isn't threatened by any of the enemy pieces
      if (possibleMoves.includes(destinationSquare.index)) {
        return false;
      }
    }

    return true;
  }

  getCastlingRook(kingSquare, castlingSquare, squares = this.state.squares) {
    if (castlingSquare.index > kingSquare.index) {
      if (kingSquare.piece.color === 'black') {
        return squares[7];
      } else {
        return squares[63];
      }
    } else {
      if (kingSquare.piece.color === 'black') {
        return squares[0];
      } else {
        return squares[56];
      }
    }
  }

  getEnPassantPawn(selectedSquare, destinationSquare, squares = this.state.squares) {
    if (selectedSquare.piece.color === 'black') {
      return squares[destinationSquare.index - 8];
    } else {
      return squares[destinationSquare.index + 8];
    }
  }

  squaresBetweenLocations(square1, square2) {
    const squaresBetween = [];

    if (square1.index > square2.index) {
      for (let i = square2.index + 1; i < square1.index; i++) {
        squaresBetween.push(this.state.squares[i]);
      }
    } else {
      for (let i = square1.index + 1; i < square2.index; i++) {
        squaresBetween.push(this.state.squares[i]);
      }
    }

    return squaresBetween;
  }

  render() {
    return (
      <main className="container flex justify-center items-center">
        <Board
          squares={this.state.squares}
          checkmate={this.state.checkmate}
          selectedSquare={this.state.selectedSquare}
          lastMove={this.state.history.lastMove()}
          onClick={(index) => this.handleClick(index)}
        />
        {/* Modal untuk Checkmate */}
        {this.state.showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="bg-white p-4 rounded-lg shadow-lg text-center">
              <h2 className="text-xl font-bold">Checkmate!</h2>
              <p className="mt-2">{this.state.modalMessage}</p>
              <div className='flex justify-center gap-2'>
                <a
                  href='/'
                  className="mt-4 bg-blue-500 text-white w-full px-4 py-2 rounded"
                >
                  Retry?
                </a>
                <button
                  className="mt-4 bg-red-500 text-white w-full px-4 py-2 rounded"
                  onClick={() => this.setState({ showModal: false })}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    );
  }
}
