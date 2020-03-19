import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Board from './board';
import { Greeting } from './greeting';
import { Refresh } from './refresh';

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
        console.log('winner: ', winner(squares));
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
        let opacity = this.state.winner ? 0.5 : 1;
        let pointerEvent = this.state.winner ? 'none' : 'all';
        return (
            <div>
                <div className="greeting_container">
                    <Greeting/>
                </div>
                <div className="dataBoard">
                    <h3>current player: {this.state.isXCurrent ? 'X' : 'O'}</h3>
                    <h3>winner is: {this.state.winner}</h3>
                    <Refresh 
                    onClick={this.handleRefresh}
                    opacity={this.state.winner ? 1 : 0.5}
                    pointerEvents={this.state.winner ? 'all' : 'none'}/>
                </div>
                <Board 
                squares={this.state.squares}
                onClick={this.handleClick}
                opacity={this.state.winner ? 0.5 : 1}
                pointerEvents={this.state.winner ? 'none' : 'all'}/>
            </div>
        );
    }
};

ReactDOM.render(<Main/>, document.getElementById('root'));

serviceWorker.unregister();
