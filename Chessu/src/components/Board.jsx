import Square from './Square';
import React from 'react';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flipped: false,
    };
  }

  componentDidUpdate(prevProps) {
    // Jika terjadi pergerakan, flip board
    if (prevProps.lastMove !== this.props.lastMove) {
      this.setState({ flipped: !this.state.flipped });
    }
  }

  renderSquare(square) {
    let cssClasses = square.bgColor;

    if (this.props.lastMove?.move_from === square.index) {
      cssClasses = 'bg-[#AAA23A90]';
    } else if (this.props.lastMove?.move_to === square.index) {
      cssClasses = 'bg-[#AAA23A]';
    } else if (this.props.selectedSquare?.piece === square.piece) {
      cssClasses += ' border-piece';
    }

    if (this.props.checkmate) {
      return <Square key={square.index} piece={square.piece} cssClasses={cssClasses} />;
    } else {
      return <Square key={square.index} piece={square.piece} cssClasses={cssClasses} onClick={() => this.props.onClick(square)} />;
    }
  }

  render() {
    let displayedBoard = [];
    let index = 0;

    for (let x = 0; x < 8; x++) {
      let boardRow = [];
      for (let y = 0; y < 8; y++) {
        boardRow.push(this.renderSquare(this.props.squares[index]));
        index += 1;
      }
      displayedBoard.push(
        <div className="row" key={x}>
          {this.state.flipped ? boardRow.reverse() : boardRow}
        </div>
      );
    }

    if (this.state.flipped) {
      displayedBoard.reverse(); // Membalik urutan baris saat papan terbalik
    }

    let restart;
    if (this.props.checkmate) {
      restart = <a href="/" className="text-white bg-[#1F1F1F] font-bold text-center items-center flex justify-center">Play again?</a>;
    }

    return (
      <div className="border-2">
        {displayedBoard}
        <p>{this.props.message}</p>
        {restart}
      </div>
    );
  }
}
