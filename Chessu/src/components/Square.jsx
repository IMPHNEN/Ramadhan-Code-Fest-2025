import React from 'react';

export default class Square extends React.Component {
  render() {
    if (this.props.piece) {
      return (
        <div className={`square ${this.props.cssClasses}`} onClick={this.props.onClick}>
          <img src={this.props.piece.image} alt={this.props.piece.name}/>
        </div>
      );
    } else {
      return (
        <div className={`square ${this.props.cssClasses}`} onClick={this.props.onClick}>
          <span className="sr-only">empty square</span>
        </div>
      );
    }
  }
};
