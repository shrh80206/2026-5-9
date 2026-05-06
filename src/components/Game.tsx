import { useState } from 'react'

type Color = 'w' | 'b'
type Piece = { kind: string; color: Color } | null

const unicodeMap: Record<string, string> = {
  K: '♔', Q: '♕', R: '♖', B: '♗', N: '♘', P: '♙',
  k: '♚', q: '♛', r: '♜', b: '♝', n: '♞', p: '♟',
}

function makeInitialBoard(): Piece[][] {
  const emptyRow: Piece[] = Array(8).fill(null)
  const board: Piece[][] = []
  board.push(['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'].map((s) => ({ kind: s, color: 'b' } as Piece)))
  board.push(Array(8).fill({ kind: 'p', color: 'b' }))
  for (let i = 0; i < 4; i++) board.push([...emptyRow])
  board.push(Array(8).fill({ kind: 'P', color: 'w' }))
  board.push(['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'].map((s) => ({ kind: s, color: 'w' } as Piece)))
  return board
}

export default function Game() {
  const [board, setBoard] = useState<Piece[][]>(() => makeInitialBoard())
  const [selected, setSelected] = useState<{ r: number; c: number } | null>(null)
  const [turn, setTurn] = useState<Color>('w')
  const [winner, setWinner] = useState<Color | null>(null)
  const [lastMove, setLastMove] = useState<{ r: number; c: number } | null>(null)

  function onSquareClick(r: number, c: number) {
    if (winner) return
    const piece = board[r][c]
    
    if (selected) {
      const src = selected
      const p = board[src.r][src.c]
      if (!p || p.color !== turn) {
        setSelected(null)
        return
      }

      const target = board[r][c]
      if (target && target.color === p.color) {
        setSelected({ r, c })
        return
      }

      // 檢查是否吃掉國王
      if (target && (target.kind.toLowerCase() === 'k')) {
        setWinner(turn)
      }

      const newBoard = board.map((row) => row.map((cell) => (cell ? { ...cell } : null)))
      newBoard[r][c] = { ...p }
      newBoard[src.r][src.c] = null
      
      setBoard(newBoard)
      setSelected(null)
      setLastMove({ r, c })
      setTurn((t) => (t === 'w' ? 'b' : 'w'))
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
    setWinner(null)
    setLastMove(null)
  }

  return (
    <div className="game-container">
      <h2>互動西洋棋</h2>
      <div className="game-status">
        {winner ? (
          <div className="winner-announcement animate-bounce">
            🎉 恭喜！{winner === 'w' ? '白方' : '黑方'} 獲得勝利！
          </div>
        ) : (
          <p>輪到：<span className={turn === 'w' ? 'text-white' : 'text-black'}>{turn === 'w' ? '白方' : '黑方'}</span></p>
        )}
      </div>

      <div className="chess-wrap">
        <div className="chess-board">
          {board.map((row, r) =>
            row.map((cell, c) => {
              const isDark = (r + c) % 2 === 1
              const isSelected = selected && selected.r === r && selected.c === c
              const isLast = lastMove && lastMove.r === r && lastMove.c === c
              return (
                <button
                  key={`${r}-${c}`}
                  className={`square ${isDark ? 'dark' : 'light'} ${isSelected ? 'selected' : ''} ${isLast ? 'last-move' : ''}`}
                  onClick={() => onSquareClick(r, c)}
                >
                  <span className={`piece ${cell ? (cell.color === 'w' ? 'white' : 'black') : ''} ${cell ? 'animate-in' : ''}`}>
                    {cell ? unicodeMap[cell.kind] : ''}
                  </span>
                </button>
              )
            })
          )}
        </div>

        <div className="chess-controls">
          <button className="reset-btn" onClick={resetBoard}>重新開始</button>
          <div className="legend">
            <p>💡 提示：點擊棋子進行選取，再次點擊目標位置移動。</p>
            <p>🏆 勝利條件：吃掉對方的國王即可獲勝！</p>
          </div>
        </div>
      </div>
    </div>
  )
}
