import { useEffect, useState } from 'react'
import './App.css'

const BOX = [
  '', '', '',
  '', '', '',
  '', '', ''
]

const WINNING_COMBINATION = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
]

function App() {
  const [box, setBox] = useState(BOX);
  const [winner, setWinner] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState('X');

  const checkMatched = () => {
    for (let [a, b, c] of WINNING_COMBINATION) {
      if (box[a] && box[a] == box[b] && box[b] == box[c]) {
        setWinner(box[a]);
        return
      }
    }
    if (!winner && box.every(cell => cell != '')) {
      setWinner('draw')
    }
  }

  useEffect(() => {
    checkMatched();
  }, [box])

  const handleClick = (i) => {
    if (!winner && (box[i] == '')) {
      setBox(box.map((val, ind) => (ind == i ? currentPlayer : val)))
      setCurrentPlayer(currentPlayer == 'X' ? 'O' : 'X')
    }
  }

  function handleReset() {
    setBox(BOX)
    setWinner(null)
    setCurrentPlayer('X')
  }

  return (
    <div className='page'>
      <h1 className='game-heading'>TIC TAC TOE</h1>

      {winner == 'draw' && <h2 className="result draw">Match is draw</h2>}
      {(winner == 'X' || winner == 'O') && <h2 className="result">Winner is {winner}</h2>}
      <div className="board">
        {box.map((value, i) => (
          <div key={i} className={`box ${box[i]}`} onClick={() => handleClick(i)}>
            <h2 className="value">{value}</h2>
          </div>
        ))}
      </div>
      <button className="btn-reset" onClick={handleReset}>Reset</button>
    </div>
  )
}

export default App
