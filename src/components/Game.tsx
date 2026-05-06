import { useState } from 'react'

type Color = 'w' | 'b'
type Piece = { kind: string; color: Color } | null

const unicodeMap: Record<string, string> = {
  K: '♔',
  Q: '♕',
  R: '♖',
  B: '♗',
  N: '♘',
  P: '♙',
  k: '♚',
  q: '♛',
  r: '♜',
  b: '♝',
  n: '♞',
  p: '♟',
}

function makeInitialBoard(): Piece[][] {
  const emptyRow: Piece[] = Array(8).fill(null)
  const board: Piece[][] = []
  board.push(
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'].map((s) => ({ kind: s, color: 'b' } as Piece))
  )
  board.push(Array(8).fill({ kind: 'p', color: 'b' }))
  for (let i = 0; i < 4; i++) board.push([...emptyRow])
  board.push(Array(8).fill({ kind: 'P', color: 'w' }))
  board.push(
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'].map((s) => ({ kind: s, color: 'w' } as Piece))
  )
  return board
}

export default function Game(): JSX.Element {
  const [board, setBoard] = useState<Piece[][]>(() => makeInitialBoard())
  const [selected, setSelected] = useState<{ r: number; c: number } | null>(null)
  const [turn, setTurn] = useState<Color>('w')
  const [lastMove, setLastMove] = useState<{ r: number; c: number } | null>(null)

  function onSquareClick(r: number, c: number) {
    const piece = board[r][c]
    if (selected) {
      const src = selected
      const p = board[src.r][src.c]
      if (!p) {
        setSelected(null)
        return
      }
      if (p.color !== turn) {
        setSelected(null)
        return
      }
      const target = board[r][c]
      if (target && target.color === p.color) {
        setSelected({ r, c })
        return
      }
      const newBoard = board.map((row) => row.map((cell) => (cell ? { ...cell } : null)))
      newBoard[r][c] = { ...p }
      newBoard[src.r][src.c] = null
      setBoard(newBoard)
      setSelected(null)
      setLastMove({ r, c })
      setTurn((t) => (t === 'w' ? 'b' : 'w'))
      setTimeout(() => setLastMove(null), 900)
    } else {
      if (piece && piece.color === turn) {
        setSelected({ r, c })
      }
    }
  }

  function resetBoard() {
    setBoard(makeInitialBoard())
    setSelected(null)
    setTurn('w')
    setLastMove(null)
  }

  return (
    <div>
      <h2>小遊戲：西洋棋（簡化）</h2>
      <p>說明：可點選己方棋子再點目標格移動（未實作完整棋規）。輪到：{turn === 'w' ? '白方' : '黑方'}</p>
      <div className="chess-wrap">
        <div className="chess-board" aria-label="chessboard">
          {board.map((row, r) =>
            row.map((cell, c) => {
              const isDark = (r + c) % 2 === 1
              const isSelected = selected && selected.r === r && selected.c === c
              const isLast = lastMove && lastMove.r === r && lastMove.c === c
              return (
                <button
                  key={`${r}-${c}`}
                  className={`square ${isDark ? 'dark' : 'light'} ${isSelected ? 'selected' : ''} ${
                    isLast ? 'glow' : ''
                  }`}
                  onClick={() => onSquareClick(r, c)}
                  aria-label={`square-${r}-${c}`}
                >
                  <span className={`piece ${cell ? (cell.color === 'w' ? 'white' : 'black') : ''}`}>
                    {cell ? unicodeMap[cell.kind] : ''}
                  </span>
                </button>
              )
            })
          )}
        </div>

        <div className="chess-controls">
          <button onClick={resetBoard}>重新開始</button>
          <div className="legend">提示：點選己方棋子 → 點選目標格。移動會有光暈與縮放特效。</div>
        </div>
      </div>
    </div>
  )
}
