import React from 'react'
import Intro from './components/Intro'
import Profile from './components/Profile'
import Game from './components/Game'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <header style={{ padding: 16, borderBottom: '1px solid var(--border)' }}>
        <h1>期中網站範例</h1>
        <nav>
          <a href="#intro" style={{ marginRight: 12 }}>網站介紹</a>
          <a href="#profile" style={{ marginRight: 12 }}>個人簡介</a>
          <a href="#game">小遊戲</a>
        </nav>
      </header>

      <main style={{ padding: 16 }}>
        <section id="intro" style={{ marginBottom: 40 }}>
          <Intro />
        </section>

        <section id="profile" style={{ marginBottom: 40 }}>
          <Profile />
        </section>

        <section id="game" style={{ marginBottom: 40 }}>
          <Game />
        </section>
      </main>

      <footer style={{ padding: 16, borderTop: '1px solid var(--border)', textAlign: 'center' }}>
        © 期中作品
      </footer>
    </div>
  )
}

export default App
