import React from 'react';
import { Square } from './square';

export default class Board extends React.Component{
    constructor(props){
        super(props);
        this.renderSquare = this.renderSquare.bind(this);
    }

    renderSquare(i){
        return (<Square value={this.props.squares[i]} onClick={()=>this.props.onClick(i)}/>);
    }

    render(){
        return(
            <div className="board_container" style={{opacity: this.props.opacity, pointerEvents: this.props.pointerEvents}}>
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