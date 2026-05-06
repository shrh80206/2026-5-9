import { useState } from 'react'

type Color = 'w' | 'b'
type PieceType = 'p' | 'r' | 'n' | 'b' | 'q' | 'k'
type Piece = { type: PieceType; color: Color } | null

const unicodeMap: Record<string, string> = {
  k: '♚', q: '♛', r: '♜', b: '♝', n: '♞', p: '♟',
  K: '♔', Q: '♕', R: '♖', B: '♗', N: '♘', P: '♙',
}

function makeInitialBoard(): Piece[][] {
  const layout: PieceType[] = ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r']
  const board: Piece[][] = Array(8).fill(null).map(() => Array(8).fill(null))
  
  for (let i = 0; i < 8; i++) {
    board[0][i] = { type: layout[i], color: 'b' }
    board[1][i] = { type: 'p', color: 'b' }
    board[6][i] = { type: 'p', color: 'w' }
    board[7][i] = { type: layout[i], color: 'w' }
  }
  return board
}

export default function Game() {
  const [board, setBoard] = useState<Piece[][]>(() => makeInitialBoard())
  const [selected, setSelected] = useState<{ r: number; c: number } | null>(null)
  const [turn, setTurn] = useState<Color>('w')
  const [winner, setWinner] = useState<Color | null>(null)

  const isValidMove = (srcR: number, srcC: number, dstR: number, dstC: number): boolean => {
    const p = board[srcR][srcC]
    if (!p) return false
    const target = board[dstR][dstC]
    if (target && target.color === p.color) return false

    const dr = dstR - srcR
    const dc = dstC - srcC
    const absDr = Math.abs(dr)
    const absDc = Math.abs(dc)

    switch (p.type) {
      case 'p':
        const dir = p.color === 'w' ? -1 : 1
        if (dc === 0 && !target) {
          if (dr === dir) return true
          if (dr === 2 * dir && (srcR === 1 || srcR === 6) && !board[srcR + dir][srcC]) return true
        }
        if (absDc === 1 && dr === dir && target) return true
        return false
      case 'r':
        if (dr !== 0 && dc !== 0) return false
        return isPathClear(srcR, srcC, dstR, dstC)
      case 'n':
        return (absDr === 2 && absDc === 1) || (absDr === 1 && absDc === 2)
      case 'b':
        if (absDr !== absDc) return false
        return isPathClear(srcR, srcC, dstR, dstC)
      case 'q':
        if (dr !== 0 && dc !== 0 && absDr !== absDc) return false
        return isPathClear(srcR, srcC, dstR, dstC)
      case 'k':
        return absDr <= 1 && absDc <= 1
      default:
        return false
    }
  }

  const isPathClear = (sr: number, sc: number, dr: number, dc: number): boolean => {
    const stepR = dr === sr ? 0 : (dr > sr ? 1 : -1)
    const stepC = dc === sc ? 0 : (dc > sc ? 1 : -1)
    let currR = sr + stepR
    let currC = sc + stepC
    while (currR !== dr || currC !== dc) {
      if (board[currR][currC]) return false
      currR += stepR
      currC += stepC
    }
    return true
  }

  function onSquareClick(r: number, c: number) {
    if (winner) return
    
    if (selected) {
      if (isValidMove(selected.r, selected.c, r, c)) {
        const target = board[r][c]
        const newBoard = board.map(row => [...row])
        newBoard[r][c] = board[selected.r][selected.c]
        newBoard[selected.r][selected.c] = null
        
        setBoard(newBoard)
        if (target?.type === 'k') setWinner(turn)
        setTurn(turn === 'w' ? 'b' : 'w')
        setSelected(null)
      } else {
        const piece = board[r][c]
        if (piece && piece.color === turn) setSelected({ r, c })
        else setSelected(null)
      }
    } else {
      const piece = board[r][c]
      if (piece && piece.color === turn) setSelected({ r, c })
    }
  }

  return (
    <div className={`game-wrapper ${winner ? 'game-over' : ''}`}>
      <h2 className="section-title">Grand Chess</h2>
      
      <div className="game-info">
        {!winner ? (
          <div className="turn-indicator">
            <span className={`dot ${turn}`}></span>
            {turn === 'w' ? 'White' : 'Black'}'s Turn
          </div>
        ) : (
          <div className="winner-banner animate-glitch">
            {winner === 'w' ? 'WHITE' : 'BLACK'} VICTORIOUS
          </div>
        )}
      </div>

      <div className="chess-container">
        <div className="board">
          {board.map((row, r) => row.map((cell, c) => (
            <div 
              key={`${r}-${c}`}
              className={`sq ${(r+c)%2 ? 'sq-d' : 'sq-l'} ${selected?.r===r && selected?.c===c ? 'sq-s' : ''}`}
              onClick={() => onSquareClick(r, c)}
            >
              {cell && (
                <span className={`pc ${cell.color} ${cell.type}`}>
                  {unicodeMap[cell.color === 'w' ? cell.type.toUpperCase() : cell.type.toLowerCase()]}
                </span>
              )}
            </div>
          )))}
        </div>
      </div>

      {winner && (
        <div className="overlay animate-fadein">
          <div className="modal">
            <h1>CHECKMATE</h1>
            <p>{winner === 'w' ? 'White' : 'Black'} has dominated the board.</p>
            <button onClick={() => { setBoard(makeInitialBoard()); setWinner(null); setTurn('w'); }}>REMATCH</button>
          </div>
        </div>
      )}
    </div>
  )
}
