import Intro from './components/Intro'
import Profile from './components/Profile'
import Game from './components/Game'

export default function App() {
  return (
    <div className="app-container">
      <header className="main-header">
        <h1 className="glitch-text">VOID CHESS</h1>
        <nav className="main-nav">
          <a href="#intro">MISSION</a>
          <a href="#profile">PILOT</a>
          <a href="#game">STRATEGY</a>
        </nav>
      </header>

      <main className="main-content">
        <section id="intro">
          <Intro />
        </section>

        <section id="profile">
          <Profile />
        </section>

        <section id="game">
          <Game />
        </section>
      </main>

      <footer className="main-footer">
        <div className="footer-line"></div>
        <p>SYSTEM STATUS: OPERATIONAL | © 2026 VOID ARCHIVE</p>
      </footer>
    </div>
  )
}
