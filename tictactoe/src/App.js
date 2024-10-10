import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

const Board = ({squares,onClick}) => {
  return (
    <div className='board'>
      {squares.map((square,index)=>(
        <button key={index} className='square' onClick={()=>onClick(index)}>
          {square}
        </button>
      ))}
    </div>
  )
}


function App() {

  const [squares,setSquares] = useState(Array(9).fill(null));
  const [Xnext,setXnext] = useState(true);
  const winner = FindWinner(squares);


  const Clicked = (index)=> {
    if (squares[index] || winner) return;

    const newSquare = squares.slice();
    newSquare[index] = Xnext ? "X" : "O";
    setSquares(newSquare)
    setXnext(!Xnext)
  }

  const clearTable = () => {
    setSquares(Array(9).fill(null))
    setXnext(true)
  }

  const showStatus = () => {
    if(winner) {
      return alert(`Winner is ${winner}!!!`)
    }else if (squares.every((square)=>(square))){
      return alert("MATCH DRAW !!!")
    }else{
      return `Next Player : ${Xnext ? "X":"O"}`
    }
  }

  return (
    <div className='game'>
      <h1>Tic-Tac-Toe</h1>
      <div className='status'>{showStatus()}</div>
      <Board squares={squares} onClick={Clicked}/>
      <button className="reset-button" onClick={clearTable}>Reset Game</button>
    </div>
  );
}

const FindWinner = (squares)=>{
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
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default App;