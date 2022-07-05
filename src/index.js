import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

class Square extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            value: null,
        };
    }


    render() {
        return (
            <button className="square" onClick={() => {
                if (this.state.value == null) {
                    this.props.onClick(); 
                    this.clicked();
                }
            }}>
                {this.state.value}
            </button>
        );
    }

    clicked = (e)  => {
        this.setState({value: this.props.currentPlayer})
        this.props.changeCurrentPlayer(this.props.currentPlayer == 'X' ? 'O' : 'X');
    }
  }
  
class Board extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            currentPlayer: 'X',
            squares: Array(9).fill(null)
        }
    }

    changeCurrentPlayer(value) {
        this.setState({currentPlayer: value})
    }


    handleClick(value) {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[value]) {
            return;
        }

        squares[value] = this.state.currentPlayer;
        this.setState({squares: squares});
    }

    renderSquare(i) {
        return <Square 
            onClick={() => this.handleClick(i)}
            value={this.state.squares[i]} 
            changeCurrentPlayer={this.changeCurrentPlayer.bind(this)} 
            currentPlayer={this.state.currentPlayer} />;
    }

    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'Wygrywa: ' + winner;
        } else {
            status = 'Następny gracz: ' + (this.state.currentPlayer);
        }

        return (
            <div>
                <h2 className="status">
                    <strong>{status}</strong>
                </h2>
                
                <div className="board__container">
                    {[...Array(9)].map((x, i) =>
                        <div className="board__cell" key={i}>
                            {this.renderSquare(i)}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}
  

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
}

// ========================================
  
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
  