import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
function Greeting(){
    return (<h1 className="greeting">Tic Tac Toe</h1>);
}

function Square(props){
    return (
        <button className="square" onClick={props.onClick}>{props.value}</button>
    );
}

function Refresh(props){
    return <button className="refresh" onClick={props.onClick}>Refresh</button>;
}

function isFull(squares){
    var tmp = 0;
    for(var i = 0; i < squares.length; i++){
        if(squares[i] !== null){
            tmp += 1;
        }
    }
    return (tmp === 9);
}

function winner(squares){
    const winningCombinations = [
        [0, 1, 2],//0
        [3, 4, 5],//1
        [6, 7, 8],//2
        [0, 3, 6],//3
        [1, 4, 7],//4
        [2, 5, 8],//5
        [0, 4, 8],//6
        [6, 4, 2],//7
    ];
    for(var i = 0; i < winningCombinations.length; i++){
        const [a, b, c] = winningCombinations[i];
        if(squares[a] === squares[b] && squares[b] === squares[c] && squares[a] === squares[c] && (squares[a] === 'X' || squares[a] === 'O')){
            return squares[a];
        } else if(isFull(squares)){
            return 'draw';
        }
    }
}

class Board extends React.Component{
    constructor(props){
        super(props);
        this.renderSquare = this.renderSquare.bind(this);
    }

    renderSquare(i){
        return (<Square value={this.props.squares[i]} onClick={()=>this.props.onClick(i)}/>);
    }

    render(){
        return(
            <div className="board_container">
                <div className="boardRow">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="boardRow">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="boardRow">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Main extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            isXCurrent: true,
            winner: null
        };
        this.handleRefresh = this.handleRefresh.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(i){
        const squares = this.state.squares.slice();
        if(squares[i] || winner(squares)){
            return;
        }
        squares[i] = (this.state.isXCurrent ? 'X' : 'O');
        this.setState({
            squares: squares,
            isXCurrent: !this.state.isXCurrent,
            winner: winner(squares)
        });
    }

    handleRefresh(){
        this.setState({
            squares: Array(9).fill(null),
            isXCurrent: true,
            winner: null
        })
    }

    render(){
        return (
            <div>
                <div className="greeting_container">
                    <Greeting/>
                </div>
                <div className="dataBoard">
                    <h3>current player: {this.state.isXCurrent ? 'X' : 'O'}</h3>
                    <h3>winner is: {this.state.winner}</h3>
                    <Refresh onClick={this.handleRefresh}/>
                </div>
                <Board squares={this.state.squares} onClick={this.handleClick}/>
            </div>
        );
    }
};

ReactDOM.render(<Main/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
