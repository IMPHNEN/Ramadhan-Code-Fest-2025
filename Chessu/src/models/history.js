export default class History {
  constructor() {
    this.moves = [];
  }

  logMove(description) {
    description['notation'] = this.translateToChessNotation(
      description
    );
    this.moves.push(description);
    return description;
  }

  lastMove() {
    return this.moves[this.moves.length - 1];
  }

  translateToChessNotation(moveDescription) {
    const PIECE_DICTIONARY = {
      Pawn: '',
      King: 'K',
      Queen: 'Q',
      Bishop: 'B',
      Knight: 'N',
      Rook: 'R'
    };

    let piece, capture, x, y, promotion, suffix;

    if (moveDescription.castle) {
      if (moveDescription.move_to > moveDescription.move_from) {
        return '0-0';
      } else {
        return '0-0-0';
      }
    }

    piece = PIECE_DICTIONARY[moveDescription.piece.className];
    x = this.getColumn(moveDescription.move_to);
    y = this.getRow(moveDescription.move_to);

    if (moveDescription.checkmate) {
      suffix = '#';
    } else if (moveDescription.check) {
      suffix = '+';
    } else {
      suffix = '';
    }

    if (moveDescription.capture && moveDescription.piece.className === 'Pawn') {
      capture = this.getColumn(moveDescription.move_from);
      capture += 'x';
    } else if (moveDescription.capture) {
      capture = 'x';
    } else {
      capture = '';
    }

    if (moveDescription.promotion) {
      promotion = '=Q'
    } else {
      promotion = '';
    }

    return `${piece}${capture}${x}${y}${promotion}${suffix}`;
  }

  getColumn(index) {
    if (index % 8 === 0) {
      return 'a';
    } else if ((index - 1) % 8 === 0) {
      return 'b';
    } else if ((index - 2) % 8 === 0) {
      return 'c';
    } else if ((index - 3) % 8 === 0) {
      return 'd';
    } else if ((index - 4) % 8 === 0) {
      return 'e';
    } else if ((index - 5) % 8 === 0) {
      return 'f';
    } else if ((index - 6) % 8 === 0) {
      return 'g';
    } else {
      return 'h';
    }
  }

  getRow(index) {
    if (index < 8) {
      return '8';
    } else if (index < 16) {
      return '7';
    } else if (index < 24) {
      return '6';
    } else if (index < 32) {
      return '5';
    } else if (index < 40) {
      return '4';
    } else if (index < 48) {
      return '3';
    } else if (index < 56) {
      return '2';
    } else {
      return '1';
    }
  }
}
